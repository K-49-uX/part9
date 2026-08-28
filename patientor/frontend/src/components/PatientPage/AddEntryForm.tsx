import { useState, SyntheticEvent } from "react";
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  Alert, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  SelectChangeEvent, 
  OutlinedInput, 
  Chip 
} from "@mui/material";
import { NewEntry, HealthCheckRating, Diagnosis } from "../../types";

interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
  error?: string;
  diagnoses: Diagnosis[];
}

type EntryFormValues = {
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes: string[];
  healthCheckRating: string;
  employerName: string;
  sickLeaveStartDate: string;
  sickLeaveEndDate: string;
  dischargeDate: string;
  dischargeCriteria: string;
};

const AddEntryForm = ({ onSubmit, onCancel, error, diagnoses }: Props) => {
  const [entryType, setEntryType] = useState<"HealthCheck" | "OccupationalHealthcare" | "Hospital">("HealthCheck");
  
  const [formValues, setFormValues] = useState<EntryFormValues>({
    description: "",
    date: "",
    specialist: "",
    diagnosisCodes: [],
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

  const handleDiagnosisChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setFormValues({
      ...formValues,
      diagnosisCodes: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const addTheEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    const codesArray = formValues.diagnosisCodes.length > 0 ? formValues.diagnosisCodes : undefined;

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
          type="date"
          fullWidth
          required
          InputLabelProps={{ shrink: true }}
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

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Diagnosis codes</InputLabel>
          <Select
            multiple
            value={formValues.diagnosisCodes}
            onChange={handleDiagnosisChange}
            input={<OutlinedInput label="Diagnosis codes" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((code) => (
                  <Chip key={code} label={code} />
                ))}
              </Box>
            )}
          >
            {diagnoses.map((diagnosis) => (
              <MenuItem key={diagnosis.code} value={diagnosis.code}>
                {diagnosis.code} — {diagnosis.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {entryType === "HealthCheck" && (
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Health Check Rating</InputLabel>
            <Select
              value={formValues.healthCheckRating}
              label="Health Check Rating"
              onChange={(e) => setFormValues({ ...formValues, healthCheckRating: e.target.value })}
            >
              <MenuItem value="0">0 — Healthy</MenuItem>
              <MenuItem value="1">1 — Low Risk</MenuItem>
              <MenuItem value="2">2 — High Risk</MenuItem>
              <MenuItem value="3">3 — Critical Risk</MenuItem>
            </Select>
          </FormControl>
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