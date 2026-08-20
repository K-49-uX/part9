import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Box } from "@mui/material";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

import { Patient, Entry, Gender } from "../../types";
import patientService from "../../services/patients";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

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