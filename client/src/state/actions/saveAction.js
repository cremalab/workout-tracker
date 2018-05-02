//Saving what user types in input as payload. Will come back to this later
// export function saveExercise(exerciseData){
//     return {
//         type: 'SAVE_EXERCISE',
//         payload: exerciseData.target.value,
//         key: exerciseData.target.name
//     }
// }

export function saveExercise(exerciseData){
    return {
        type: 'SAVE_EXERCISE',
        payload: exerciseData.target.value,
        key: exerciseData.target.name
    }
}