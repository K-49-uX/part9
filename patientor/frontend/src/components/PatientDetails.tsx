import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Patient } from '../types';
import patientService from '../services/patients';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { Button, Typography } from '@mui/material';

const PatientDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        try {
          const fetchedPatient = await patientService.getById(id);
          setPatient(fetchedPatient);
        } catch (e) {
          console.error(e);
        }
      }
    };
    void fetchPatient();
  }, [id]);

  if (!patient) {
    return <div>Loading patient data...</div>;
  }

  const renderGenderIcon = (gender: string) => {
    switch (gender) {
      case 'male':
        return <MaleIcon />;
      case 'female':
        return <FemaleIcon />;
      default:
        return <TransgenderIcon />;
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Button component={Link} to="/" variant="contained" color="primary" style={{ marginBottom: '20px' }}>
        Home
      </Button>
      <Typography variant="h4" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {patient.name} {renderGenderIcon(patient.gender)}
      </Typography>
      <Typography variant="body1" style={{ marginTop: '10px' }}>
        ssn: {patient.ssn}
      </Typography>
      <Typography variant="body1">
        occupation: {patient.occupation}
      </Typography>
      <Typography variant="body1">
        date of birth: {patient.dateOfBirth}
      </Typography>
    </div>
  );
};

export default PatientDetails;