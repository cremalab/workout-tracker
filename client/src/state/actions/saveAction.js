export function saveExercise(exercise){
    return {
        type: 'SAVE_EXERCISE',
        payload: exercise
    }
}