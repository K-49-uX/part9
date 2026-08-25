import { Gender } from '../types.js';
const patientsData = [
    {
        id: "d2773336-f723-11e9-8f0b-362b9e155667",
        name: "John McClane",
        dateOfBirth: "1986-07-09",
        ssn: "090786-122X",
        gender: Gender.Male,
        occupation: "New York City cop",
        entries: [
            {
                id: "d811e46d-70b3-4d90-b090-4535c7cf8fb1",
                date: "2015-01-02",
                type: "Hospital",
                specialist: "MD House",
                diagnosisCodes: ["S62.5"],
                description: "Healing time appr. 2 weeks. patient doesn't remember how he got the injury.",
                discharge: {
                    date: "2015-01-16",
                    criteria: "Thumb has healed.",
                }
            },
            {
                id: "fcd59fa6-c4b4-4fec-ac4d-df4fe1f85f62",
                date: "2019-08-05",
                type: "OccupationalHealthcare",
                specialist: "MD House",
                employerName: "HyPD",
                diagnosisCodes: ["Z57.1", "Z74.3", "M51.2"],
                description: "Patient mistakenly found himself in a nuclear plant waste site without protection gear. Very minor radiation poisoning.",
                sickLeave: {
                    startDate: "2019-08-05",
                    endDate: "2019-08-28"
                }
            },
            {
                id: "b4f4ecee-971d-4461-9c93-dcc776512967",
                date: "2020-04-28",
                type: "HealthCheck",
                specialist: "MD House",
                diagnosisCodes: ["Z00.0"],
                description: "Digital teleconsultation. Healthy.",
                healthCheckRating: 0
            }
        ]
    },
    {
        id: "d2773598-f723-11e9-8f0b-362b9e155667",
        name: "Martin Riggs",
        dateOfBirth: "1915-01-15",
        ssn: "150115-9002",
        gender: Gender.Male,
        occupation: "Police officer",
        entries: [
            {
                id: "3475cb39-fde8-47e1-806c-308b4ebbc6a2",
                date: "2021-01-18",
                type: "HealthCheck",
                specialist: "MD House",
                description: "Regular check up. All clear.",
                healthCheckRating: 0
            }
        ]
    },
    {
        id: "d27736ec-f723-11e9-8f0b-362b9e155667",
        name: "Rosangela Cunha",
        dateOfBirth: "1974-01-02",
        ssn: "020174-N932",
        gender: Gender.Female,
        occupation: "Architect",
        entries: []
    }
];
export default patientsData;
