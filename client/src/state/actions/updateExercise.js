//Will save selected exercises, user input, and date
export function updateExercise(exerciseKey, exerciseStatName, value){
    return {
        type: 'UPDATE_EXERCISE',
        payload: {
            exerciseKey, 
            exerciseStatName, 
            value
        }
    }
}