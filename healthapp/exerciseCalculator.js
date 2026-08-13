import { isNotNumber } from './utils.js';
const parseArguments = (args) => {
    if (args.length < 4)
        throw new Error('Not enough arguments');
    // First argument is target (args[2]), remaining arguments are daily hours (args[3] onwards)
    const targetInput = args[2];
    const hoursInputs = args.slice(3);
    if (isNotNumber(targetInput)) {
        throw new Error('Provided target value was not a number!');
    }
    const dailyHours = [];
    for (const hour of hoursInputs) {
        if (isNotNumber(hour)) {
            throw new Error('Provided daily hours included non-number values!');
        }
        dailyHours.push(Number(hour));
    }
    return {
        target: Number(targetInput),
        dailyHours
    };
};
const calculateExercises = (dailyHours, target) => {
    const periodLength = dailyHours.length;
    const trainingDays = dailyHours.filter(hours => hours > 0).length;
    const totalHours = dailyHours.reduce((sum, hours) => sum + hours, 0);
    const average = totalHours / periodLength;
    const success = average >= target;
    let rating;
    let ratingDescription;
    if (average >= target) {
        rating = 3;
        ratingDescription = 'great job, target reached!';
    }
    else if (average >= target * 0.75) {
        rating = 2;
        ratingDescription = 'not too bad but could be better';
    }
    else {
        rating = 1;
        ratingDescription = 'needs a lot of improvement';
    }
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};
try {
    const { target, dailyHours } = parseArguments(process.argv);
    console.log(calculateExercises(dailyHours, target));
}
catch (error) {
    let errorMessage = 'Something went wrong: ';
    if (error instanceof Error) {
        errorMessage += error.message;
    }
    console.log(errorMessage);
}
