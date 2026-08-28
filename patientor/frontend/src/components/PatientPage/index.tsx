import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Box, Button } from "@mui/material";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import axios from "axios";

import { Patient, Entry, Gender, Diagnosis, NewEntry } from "../../types";
import patientService from "../../services/patients";
import EntryDetails from "./EntryDetails";
import AddEntryForm from "./AddEntryForm";

interface PatientPageProps {
  diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: PatientPageProps) => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) return;
      try {
        const fetchedPatient = await patientService.getById(id);
        setPatient(fetchedPatient);
      } catch (err) {
        console.error("Error fetching patient:", err);
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

  const getDiagnosisName = (code: string) => {
    const diagnosis = diagnoses.find(d => d.code === code);
    return diagnosis ? diagnosis.name : '';
  };

  const submitNewEntry = async (values: NewEntry) => {
    try {
      const newEntry = await patientService.addEntry(patient.id, values);
      setPatient({
        ...patient,
        entries: (patient.entries || []).concat(newEntry)
      });
      setModalOpen(false);
      setError(undefined);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e.response?.data && typeof e.response.data === 'string') {
          setError(e.response.data);
        } else if (e.response?.data?.error) {
          setError(e.response.data.error);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        setError("Unknown error occurred");
      }
    }
  };

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

        {!modalOpen && (
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => { setModalOpen(true); setError(undefined); }}
            sx={{ marginBottom: 2 }}
          >
            Add New Entry
          </Button>
        )}

        {modalOpen && (
          <AddEntryForm
            onSubmit={submitNewEntry}
            onCancel={() => { setModalOpen(false); setError(undefined); }}
            error={error}
          />
        )}

        {entriesList.length > 0 ? (
          entriesList.map((entry: Entry) => (
            <Box key={entry.id} sx={{ border: '1px solid #ccc', borderRadius: '5px', padding: 2, marginBottom: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {entry.date} - {entry.description}
              </Typography>
              <Typography variant="body2">diagnosed by {entry.specialist}</Typography>
              
              <EntryDetails entry={entry} />
              
              {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
                <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                  {entry.diagnosisCodes.map((code) => (
                    <li key={code}>
                      {code} {getDiagnosisName(code)}
                    </li>
                  ))}
                </ul>
              )}
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