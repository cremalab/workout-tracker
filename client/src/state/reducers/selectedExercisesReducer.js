import { stat } from "fs";

//State is not application state, only the state this reducer is responsible for
export default function(state = [], action){
    switch(action.type){
        case 'EXERCISE_SELECTED':
            //return state.concat([action.payload])
            return [ action.payload, ...state ]
        case 'ADD_EXERCISE':
            return state
        default:
            return state
    }
}