import { useState, useEffect } from 'react';
import axios from 'axios';
import type { DiaryEntry, NewDiaryEntry } from './types';
import { getAllDiaries, createDiary } from './services/diaryService';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllDiaries()
      .then(data => {
        setDiaries(data);
      })
      .catch(error => {
        console.error("Error fetching diaries:", error);
      });
  }, []);

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newDiary: NewDiaryEntry = {
      date,
      visibility,
      weather,
      comment
    };

    createDiary(newDiary)
      .then(data => {
        setDiaries(diaries.concat(data));
        setDate('');
        setVisibility('');
        setWeather('');
        setComment('');
        setError(null);
      })
      .catch(err => {
        if (axios.isAxiosError(err)) {
          if (err.response) {
            const errorMessage = typeof err.response.data === 'string' 
              ? err.response.data 
              : JSON.stringify(err.response.data);
            
            setError(errorMessage);
            setTimeout(() => {
              setError(null);
            }, 5000);
          } else {
            setError("Network error");
          }
        } else {
          setError("An unexpected error occurred");
        }
      });
  };

  return (
    <div style={{ padding: "20px", textAlign: "left" }}>
      <h1>Flight Diaries</h1>
      
      <h2>Add new entry</h2>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      
      <form onSubmit={diaryCreation} style={{ marginBottom: "20px" }}>
        <div>
          date: <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          visibility: 
          <input type="text" value={visibility} onChange={(e) => setVisibility(e.target.value)} placeholder="e.g. great, good, ok, poor" />
        </div>
        <div>
          weather: 
          <input type="text" value={weather} onChange={(e) => setWeather(e.target.value)} placeholder="e.g. sunny, rainy, cloudy" />
        </div>
        <div>
          comment: <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
        </div>
        <button type="submit" style={{ marginTop: "10px" }}>add</button>
      </form>

      <h2>Diary entries</h2>
      {diaries.map((diary) => (
        <div key={diary.id} style={{ marginBottom: "15px" }}>
          <h3>{diary.date}</h3>
          <p>
            visibility: {diary.visibility} <br />
            weather: {diary.weather}
            {diary.comment && <><br />comment: {diary.comment}</>}
          </p>
        </div>
      ))}
    </div>
  );
};

export default App;