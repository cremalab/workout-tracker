import _ from 'lodash'

//state is not application state, only the state this reducer is responsible for
export default function(state = [], action){
    switch(action.type){
        case 'SELECT_EXERCISE':
            //return state.concat([action.payload])
            return state
        case 'ADD_EXERCISE':
            return state
        case 'SAVE_EXERCISE':
            return [ action.payload, ...state ]
        default:
            return state
    }
}