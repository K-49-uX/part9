import { useState, SyntheticEvent } from "react";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { HealthCheckEntryWithoutId, HealthCheckRating } from "../../types";

interface Props {
  onSubmit: (values: HealthCheckEntryWithoutId) => void;
  onCancel: () => void;
  error?: string;
}

const AddHealthCheckEntryForm = ({ onSubmit, onCancel, error }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");

  const addTheEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    const codesArray = diagnosisCodes
      ? diagnosisCodes.split(",").map(code => code.trim())
      : undefined;

    onSubmit({
      type: "HealthCheck",
      description,
      date,
      specialist,
      healthCheckRating: Number(healthCheckRating) as HealthCheckRating,
      diagnosisCodes: codesArray,
    });
  };

  return (
    <Box sx={{ padding: 2, border: "1px dashed grey", marginBottom: 2, borderRadius: 1 }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        New HealthCheck Entry
      </Typography>
      {error && <Alert severity="error" sx={{ marginBottom: 2 }}>{error}</Alert>}
      <form onSubmit={addTheEntry}>
        <TextField
          label="Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          required
          value={date}
          onChange={({ target }) => setDate(target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Description"
          fullWidth
          required
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Specialist"
          fullWidth
          required
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Health Check Rating (0-3)"
          type="number"
          fullWidth
          required
          value={healthCheckRating}
          onChange={({ target }) => setHealthCheckRating(target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Diagnosis Codes (comma-separated)"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Box display="flex" justifyContent="space-between">
          <Button color="secondary" variant="contained" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Add
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddHealthCheckEntryForm;