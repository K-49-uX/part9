import { isNotNumber } from './utils.js';
export const calculateBmi = (height, weight) => {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    if (bmi < 16.0) {
        return 'Underweight (Severe thinness)';
    }
    else if (bmi >= 16.0 && bmi <= 16.9) {
        return 'Underweight (Moderate thinness)';
    }
    else if (bmi >= 17.0 && bmi <= 18.4) {
        return 'Underweight (Mild thinness)';
    }
    else if (bmi >= 18.5 && bmi <= 24.9) {
        return 'Normal range';
    }
    else if (bmi >= 25.0 && bmi <= 29.9) {
        return 'Overweight (Pre-obese)';
    }
    else if (bmi >= 30.0 && bmi <= 34.9) {
        return 'Obese (Class I)';
    }
    else if (bmi >= 35.0 && bmi <= 39.9) {
        return 'Obese (Class II)';
    }
    else {
        return 'Obese (Class III)';
    }
};
if (process.argv[1] === import.meta.filename) {
    try {
        if (process.argv.length < 4)
            throw new Error('Not enough arguments');
        if (process.argv.length > 4)
            throw new Error('Too many arguments');
        if (!isNotNumber(process.argv[2]) && !isNotNumber(process.argv[3])) {
            const height = Number(process.argv[2]);
            const weight = Number(process.argv[3]);
            console.log(calculateBmi(height, weight));
        }
        else {
            throw new Error('Provided values were not numbers!');
        }
    }
    catch (error) {
        let errorMessage = 'Something went wrong: ';
        if (error instanceof Error) {
            errorMessage += error.message;
        }
        console.log(errorMessage);
    }
}
