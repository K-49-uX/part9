import { useState, SyntheticEvent } from "react";
import { TextField, Button, Box, Typography, Alert, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { NewEntry, HealthCheckRating } from "../../types";

interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
  error?: string;
}

type EntryFormValues = {
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes: string;
  healthCheckRating: string;
  employerName: string;
  sickLeaveStartDate: string;
  sickLeaveEndDate: string;
  dischargeDate: string;
  dischargeCriteria: string;
};

const AddEntryForm = ({ onSubmit, onCancel, error }: Props) => {
  const [entryType, setEntryType] = useState<"HealthCheck" | "OccupationalHealthcare" | "Hospital">("HealthCheck");
  
  const [formValues, setFormValues] = useState<EntryFormValues>({
    description: "",
    date: "",
    specialist: "",
    diagnosisCodes: "",
    healthCheckRating: "0",
    employerName: "",
    sickLeaveStartDate: "",
    sickLeaveEndDate: "",
    dischargeDate: "",
    dischargeCriteria: "",
  });

  const handleChange = (field: keyof EntryFormValues) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormValues({ ...formValues, [field]: event.target.value });
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setEntryType(event.target.value as "HealthCheck" | "OccupationalHealthcare" | "Hospital");
  };

  const addTheEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    const codesArray = formValues.diagnosisCodes
      ? formValues.diagnosisCodes.split(",").map(code => code.trim())
      : undefined;

    const baseFields = {
      description: formValues.description,
      date: formValues.date,
      specialist: formValues.specialist,
      diagnosisCodes: codesArray,
    };

    let entryPayload: NewEntry;

    switch (entryType) {
      case "HealthCheck":
        entryPayload = {
          ...baseFields,
          type: "HealthCheck",
          healthCheckRating: Number(formValues.healthCheckRating) as HealthCheckRating,
        };
        break;
      case "OccupationalHealthcare":
        entryPayload = {
          ...baseFields,
          type: "OccupationalHealthcare",
          employerName: formValues.employerName,
          sickLeave: formValues.sickLeaveStartDate && formValues.sickLeaveEndDate ? {
            startDate: formValues.sickLeaveStartDate,
            endDate: formValues.sickLeaveEndDate,
          } : undefined,
        };
        break;
      case "Hospital":
        entryPayload = {
          ...baseFields,
          type: "Hospital",
          discharge: {
            date: formValues.dischargeDate,
            criteria: formValues.dischargeCriteria,
          },
        };
        break;
    }

    onSubmit(entryPayload);
  };

  return (
    <Box sx={{ padding: 2, border: "1px dashed grey", marginBottom: 2, borderRadius: 1 }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        New Entry
      </Typography>
      {error && <Alert severity="error" sx={{ marginBottom: 2 }}>{error}</Alert>}
      <form onSubmit={addTheEntry}>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Entry type</InputLabel>
          <Select value={entryType} label="Entry type" onChange={handleSelectChange}>
            <MenuItem value="HealthCheck">Health Check</MenuItem>
            <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
            <MenuItem value="Hospital">Hospital</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          required
          value={formValues.date}
          onChange={handleChange("date")}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Description"
          fullWidth
          required
          value={formValues.description}
          onChange={handleChange("description")}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Specialist"
          fullWidth
          required
          value={formValues.specialist}
          onChange={handleChange("specialist")}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Diagnosis Codes (comma-separated)"
          fullWidth
          value={formValues.diagnosisCodes}
          onChange={handleChange("diagnosisCodes")}
          sx={{ marginBottom: 2 }}
        />

        {entryType === "HealthCheck" && (
          <TextField
            label="Health Check Rating (0-3)"
            type="number"
            fullWidth
            required
            value={formValues.healthCheckRating}
            onChange={handleChange("healthCheckRating")}
            sx={{ marginBottom: 2 }}
          />
        )}

        {entryType === "OccupationalHealthcare" && (
          <>
            <TextField
              label="Employer Name"
              fullWidth
              required
              value={formValues.employerName}
              onChange={handleChange("employerName")}
              sx={{ marginBottom: 2 }}
            />
            <Typography variant="subtitle2" sx={{ marginBottom: 1 }}>Sick Leave (Optional)</Typography>
            <TextField
              label="Start Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formValues.sickLeaveStartDate}
              onChange={handleChange("sickLeaveStartDate")}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="End Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formValues.sickLeaveEndDate}
              onChange={handleChange("sickLeaveEndDate")}
              sx={{ marginBottom: 2 }}
            />
          </>
        )}

        {entryType === "Hospital" && (
          <>
            <Typography variant="subtitle2" sx={{ marginBottom: 1 }}>Discharge Info</Typography>
            <TextField
              label="Discharge Date"
              type="date"
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              value={formValues.dischargeDate}
              onChange={handleChange("dischargeDate")}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Discharge Criteria"
              fullWidth
              required
              value={formValues.dischargeCriteria}
              onChange={handleChange("dischargeCriteria")}
              sx={{ marginBottom: 2 }}
            />
          </>
        )}

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

export default AddEntryForm;