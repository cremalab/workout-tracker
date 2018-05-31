export function selectExercise(exercise){
    return {
        type: 'SELECT_EXERCISE',
        payload: 
        {
            exerciseKey: exercise.exerciseKey,
            exerciseName: exercise.exerciseName,
            exerciseStats: exercise.exerciseStats
        }
    }
}