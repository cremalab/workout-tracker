//state is not application state, only the state this reducer is responsible for
export default function(state = {}, action){
    switch(action.type){
        case 'SELECT_EXERCISE':
            // const newExercises = state.activeExercise({
            //     key: exerciseKey,
            //     name: exerciseName,
            //     stats: exerciseStats
            // })
            //console.log(action.payload)
            // {...state, 
            //             key: action.payload.exercisekey,
            //             name: action.payload.exerciseName,
            //             workoutStats: {...state.exerciseStats}
            //         }
            return [...state, action.payload]
        case 'UPDATE_EXERCISE':
            // const {payload} = action
            // const {name, value} = payload
            // const exercise = state[key]
            return state
            // {...state, 
            //             [key] : {
            //                 ...exercise,
            //                 exerciseStats: exercise.exerciseStats.concat(exerciseStats)
            //             }
            //         }
            //return [...state, activeExercise: action.payload.workoutStats]
        case 'SAVE_WORKOUT':
            //return state with input populated
            return state
        default:
            return state
    }
}