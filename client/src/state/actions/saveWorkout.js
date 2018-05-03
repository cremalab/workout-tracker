//Will save selected exercises, user input, and date
export function saveWorkout(name, value){
    return {
        type: 'SAVE_WORKOUT',
        payload: {
            name,
            value
        }
    }
}