//state is not application state, only the state this reducer is responsible for
export default function(state = {}, action){
    switch(action.type){
        case 'SELECT_EXERCISE':
            if(state[action.payload.exerciseKey]){
                return state
            }
            return {...state, 
                    [action.payload.exerciseKey]:action.payload}
        case 'UPDATE_EXERCISE':
            const {payload} = action
            const { exerciseKey, 
                exerciseStatName, 
                value} = payload
            const exercise = state[exerciseKey]
            console.log(exercise)
            return {...state, 
                        [exerciseKey] : {
                            ...exercise,
                            exerciseStats: {
                                ...exercise.exerciseStats,
                                [exerciseStatName]: value
                            }
                        }
                    }
        case 'SAVE_WORKOUT':
            return state
        default:
            return state
    }
}