import { useState, useEffect } from 'react';
import type { DiaryEntry } from './types';
import { getAllDiaries } from './services/diaryService';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaries()
      .then(data => {
        setDiaries(data);
      })
      .catch(error => {
        console.error("Error fetching diaries:", error);
      });
  }, []);

  return (
    <div style={{ padding: "20px", textAlign: "left" }}>
      <h1>Flight Diaries</h1>
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