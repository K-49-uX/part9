import { useState, useEffect, SyntheticEvent } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Box, Button, TextField } from "@mui/material";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

import { Patient, Entry, Gender } from "../../types";
import patientService from "../../services/patients";

const DetailsComponent = ({ entry }: { entry: Entry }) => {
const item = entry as unknown as Record<string, unknown>;
  switch (item.type) {
    case "Hospital": {
      const discharge = item.discharge as { date: string; criteria: string } | undefined;
      return discharge ? (
        <Typography variant="body2">
          Discharge: {discharge.date} ({discharge.criteria})
        </Typography>
      ) : null;
    }
    case "OccupationalHealthcare": {
      return (
        <Typography variant="body2">
          Employer: {String(item.employerName || '')}
        </Typography>
      );
    }
    case "HealthCheck": {
      return (
        <Typography variant="body2">
          Health Rating: {String(item.healthCheckRating ?? '')}
        </Typography>
      );
    }
    default:
      return null;
  }
};

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [specialist, setSpecialist] = useState('');

  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) return;
      try {
        const fetchedPatient = await patientService.getById(id);
        console.log("DEBUG - Fetched patient object:", fetchedPatient);
        setPatient(fetchedPatient);
      } catch (err) {
        console.error("DEBUG - Error fetching patient:", err);
      }
    };
    void fetchPatient();
  }, [id]);

  if (!patient) {
    return (
      <Container>
        <Typography variant="h6" sx={{ marginTop: 3 }}>
          Loading patient data...
        </Typography>
      </Container>
    );
  }

  const getGenderIcon = (gender: Gender) => {
    switch (gender) {
      case Gender.Male:
        return <MaleIcon />;
      case Gender.Female:
        return <FemaleIcon />;
      default:
        return <TransgenderIcon />;
    }
  };

  const addEntry = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      const newEntry = await patientService.addEntry(patient.id, {
        date,
        description,
        specialist,
        type: "HealthCheck",
        healthCheckRating: 0
      });
      
      setPatient({
        ...patient,
        entries: (patient.entries || []).concat(newEntry)
      });

      setModalOpen(false);
      setDate('');
      setDescription('');
      setSpecialist('');
    } catch (err) {
      console.error("Error adding entry:", err);
    }
  };

  console.log("DEBUG - Current patient state entries:", patient.entries);
  const entriesList = patient.entries ?? [];

  return (
    <Container>
      <Box sx={{ marginTop: 3 }}>
        <Typography variant="h4" component="h2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {patient.name} {getGenderIcon(patient.gender)}
        </Typography>
        <Typography variant="body1" sx={{ marginTop: 1 }}>
          ssn: {patient.ssn ?? 'N/A'}
        </Typography>
        <Typography variant="body1">
          occupation: {patient.occupation}
        </Typography>
        <Typography variant="body1">
          date of birth: {patient.dateOfBirth || 'N/A'}
        </Typography>

        <Typography variant="h5" component="h3" sx={{ marginTop: 3, marginBottom: 2 }}>
          entries ({entriesList.length})
        </Typography>

        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => setModalOpen(true)}
          sx={{ marginBottom: 2 }}
        >
          Add New Entry
        </Button>

        {modalOpen && (
          <Box sx={{ border: '1px solid grey', padding: 2, marginBottom: 2, borderRadius: 1 }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>New Entry</Typography>
            <form onSubmit={addEntry}>
              <TextField
                label="Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={date}
                onChange={({ target }) => setDate(target.value)}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Description"
                fullWidth
                value={description}
                onChange={({ target }) => setDescription(target.value)}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Specialist"
                fullWidth
                value={specialist}
                onChange={({ target }) => setSpecialist(target.value)}
                sx={{ marginBottom: 2 }}
              />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                <Button 
                  color="secondary" 
                  variant="contained" 
                  type="button"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </Button>
                
                <Button 
                  type="submit" 
                  variant="contained"
                >
                  Add
                </Button>
              </Box>
            </form>
          </Box>
        )}

        {entriesList.length > 0 ? (
          entriesList.map((entry: Entry) => {
const rawEntry = entry as unknown as Record<string, unknown>;
            return (
              <Box key={entry.id} sx={{ border: '1px solid #ccc', borderRadius: '5px', padding: 2, marginBottom: 2 }}>
                <Typography variant="body1">
                  {entry.date} - {entry.description}
                </Typography>
                <Typography variant="body2">diagnosed by {String(rawEntry.specialist || '')}</Typography>
                <DetailsComponent entry={entry} />
                {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
                  <ul>
                    {entry.diagnosisCodes.map((code) => (
                      <li key={code}>{code}</li>
                    ))}
                  </ul>
                )}
              </Box>
            );
          })
        ) : (
          <Typography variant="body2">No entries found.</Typography>
        )}
      </Box>
    </Container>
  );
};

export default PatientPage;