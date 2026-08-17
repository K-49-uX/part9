import express from 'express';
import { calculateBmi } from './bmiCalculator.js';
import { isNotNumber } from './utils.js';
import { calculateExercises } from './exerciseCalculator.js';
const app = express();
app.use(express.json());
app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});
app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;
    if (!height || !weight || isNotNumber(height) || isNotNumber(weight)) {
        return res.status(400).json({ error: 'malformatted parameters' });
    }
    const heightNum = Number(height);
    const weightNum = Number(weight);
    const bmiResult = calculateBmi(heightNum, weightNum);
    return res.json({
        weight: weightNum,
        height: heightNum,
        bmi: bmiResult
    });
});
app.post('/exercises', (req, res) => {
    // Use unknown instead of any for request body parsing
    const body = req.body;
    const { daily_exercises, target } = body;
    if (!daily_exercises || target === undefined) {
        return res.status(400).json({ error: 'parameters missing' });
    }
    if (!Array.isArray(daily_exercises) ||
        isNaN(Number(target)) ||
        daily_exercises.some((d) => isNaN(Number(d)))) {
        return res.status(400).json({ error: 'malformatted parameters' });
    }
    const exercisesNumbers = daily_exercises.map((d) => Number(d));
    const targetNumber = Number(target);
    const result = calculateExercises(exercisesNumbers, targetNumber);
    return res.json(result);
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
