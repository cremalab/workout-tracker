export function selectExercise(exercise){
    return {
        type: 'SELECT_EXERCISE',
        payload: 
        {
            exerciseKey: exercise.key,
            exerciseName: exercise.name,
            exerciseStats: exercise.exerciseStats
        }
    }
}