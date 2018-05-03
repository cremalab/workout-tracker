export default function(state = [], action){
    switch(action.type){
        case 'SELECT_EXERCISE':
            return state
        case 'ADD_EXERCISE':
            return state
        case 'SAVE_WORKOUT':
            return [ action.payload, ...state ]
        default:
            return state
    }
}