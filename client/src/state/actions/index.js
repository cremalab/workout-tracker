export function selectExercise(exercise){
    //selectExercise is an action creator and needs to return an action, 
    //an object with a type property. 
    //Type describes purpose of action
    return {
        type: 'EXERCISE_SELECTED',
        payload: exercise,
        index: 0
    }
}