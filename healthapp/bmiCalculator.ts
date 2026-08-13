import { isNotNumber } from './utils.js';

interface BmiValues {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNotNumber(args[2]) && !isNotNumber(args[3])) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  if (bmi < 16.0) {
    return 'Underweight (Severe thinness)';
  } else if (bmi >= 16.0 && bmi <= 16.9) {
    return 'Underweight (Moderate thinness)';
  } else if (bmi >= 17.0 && bmi <= 18.4) {
    return 'Underweight (Mild thinness)';
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return 'Normal range';
  } else if (bmi >= 25.0 && bmi <= 29.9) {
    return 'Overweight (Pre-obese)';
  } else if (bmi >= 30.0 && bmi <= 34.9) {
    return 'Obese (Class I)';
  } else if (bmi >= 35.0 && bmi <= 39.9) {
    return 'Obese (Class II)';
  } else {
    return 'Obese (Class III)';
  }
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: ';
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}