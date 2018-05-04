//Will save selected exercises, user input, and date
export function updateExercise(key, name, value){
    return {
        type: 'UPDATE_EXERCISE',
        payload: {
            key,
            name,
            value,
        }
    }
}