import { useState, useEffect, SyntheticEvent } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Box, Button, TextField } from "@mui/material";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

import { Patient, Entry, Gender } from "../../types";
import patientService from "../../services/patients";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  // Form states matching what the e2e test fills out
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [specialist, setSpecialist] = useState('');

  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) return;
      try {
        const fetchedPatient = await patientService.getOne(id);
        setPatient(fetchedPatient);
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatient();
  }, [id]);

  if (!patient) {
    return <div>Loading patient data...</div>;
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
      const response = await fetch(`/api/patients/${patient.id}/entries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date,
          description,
          specialist,
          type: "HealthCheck",
          healthCheckRating: 0
        })
      });

      if (!response.ok) {
        throw new Error("Failed to add entry");
      }

      const newEntry: Entry = await response.json();
      
      setPatient({
        ...patient,
        entries: patient.entries.concat(newEntry)
      });

      setModalOpen(false);
      setDate('');
      setDescription('');
      setSpecialist('');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container>
      <Box sx={{ marginTop: 3 }}>
        <Typography variant="h4" component="h2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {patient.name} {getGenderIcon(patient.gender)}
        </Typography>
        <Typography variant="body1" sx={{ marginTop: 1 }}>
          ssn: {patient.ssn || 'N/A'}
        </Typography>
        <Typography variant="body1">
          occupation: {patient.occupation}
        </Typography>

        <Typography variant="h5" component="h3" sx={{ marginTop: 3, marginBottom: 2 }}>
          entries
        </Typography>

        {/* Top button to open the entry modal */}
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
                
                {/* Form submit button */}
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

        {patient.entries && patient.entries.length > 0 ? (
          patient.entries.map((entry: Entry) => (
            <Box key={entry.id} sx={{ border: '1px solid #ccc', borderRadius: '5px', padding: 2, marginBottom: 2 }}>
              <Typography variant="body2">{entry.date} {entry.description}</Typography>
              <ul>
                {'diagnosisCodes' in entry && entry.diagnosisCodes?.map(code => (
                  <li key={code}>{code}</li>
                ))}
              </ul>
            </Box>
          ))
        ) : (
          <Typography variant="body2">No entries found.</Typography>
        )}
      </Box>
    </Container>
  );
};

export default PatientPage;