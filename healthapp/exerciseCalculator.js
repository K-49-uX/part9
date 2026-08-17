export const calculateExercises = (dailyExercises, target) => {
    const periodLength = dailyExercises.length;
    const trainingDays = dailyExercises.filter(d => d > 0).length;
    const totalHours = dailyExercises.reduce((sum, current) => sum + current, 0);
    const average = totalHours / periodLength;
    const success = average >= target;
    let rating = 1;
    let ratingDescription = 'bad';
    if (average >= target) {
        rating = 3;
        ratingDescription = 'good job, you reached your target!';
    }
    else if (average >= target * 0.75) {
        rating = 2;
        ratingDescription = 'not too bad but could be better';
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
if (process.argv[1] === import.meta.filename) {
    try {
        const args = process.argv.slice(2);
        if (args.length < 2)
            throw new Error('Not enough arguments');
        const target = Number(args[0]);
        const exercises = args.slice(1).map(arg => Number(arg));
        if (isNaN(target) || exercises.some(isNaN)) {
            throw new Error('Provided values were not numbers!');
        }
        console.log(calculateExercises(exercises, target));
    }
    catch (error) {
        let errorMessage = 'Something went wrong: ';
        if (error instanceof Error) {
            errorMessage += error.message;
        }
        console.log(errorMessage);
    }
}
