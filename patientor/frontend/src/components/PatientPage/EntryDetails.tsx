import { Typography, Box } from "@mui/material";
import WorkIcon from '@mui/icons-material/Work';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Entry, HealthCheckRating } from "../../types";

interface EntryDetailsProps {
  entry: Entry;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const HealthCheckDetails = ({ entry }: { entry: Extract<Entry, { type: "HealthCheck" }> }) => {
  const getHealthColor = (rating: HealthCheckRating) => {
    switch (rating) {
      case HealthCheckRating.Healthy: return "green";
      case HealthCheckRating.LowRisk: return "yellow";
      case HealthCheckRating.HighRisk: return "orange";
      case HealthCheckRating.CriticalRisk: return "red";
      default: return "grey";
    }
  };

  return (
    <Box sx={{ marginTop: 1 }}>
      <MedicalServicesIcon />
      <FavoriteIcon sx={{ color: getHealthColor(entry.healthCheckRating), display: 'block', marginTop: '4px' }} />
    </Box>
  );
};

const OccupationalHealthcareDetails = ({ entry }: { entry: Extract<Entry, { type: "OccupationalHealthcare" }> }) => {
  return (
    <Box sx={{ marginTop: 1 }}>
      <WorkIcon /> <Typography component="span" sx={{ fontWeight: 'bold' }}>{entry.employerName}</Typography>
      {entry.sickLeave && (
        <Typography variant="body2" sx={{ marginTop: '4px' }}>
          Sick leave: {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
        </Typography>
      )}
    </Box>
  );
};

const HospitalDetails = ({ entry }: { entry: Extract<Entry, { type: "Hospital" }> }) => {
  return (
    <Box sx={{ marginTop: 1 }}>
      <LocalHospitalIcon />
      <Typography variant="body2" sx={{ marginTop: '4px' }}>
        Discharge: {entry.discharge.date} - {entry.discharge.criteria}
      </Typography>
    </Box>
  );
};

const EntryDetails = ({ entry }: EntryDetailsProps) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckDetails entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareDetails entry={entry} />;
    case "Hospital":
      return <HospitalDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;