export default function(state = [], action){
    switch(action.type){
        case 'SAVE_WORKOUT':
            return [ action.payload, ...state ]
        default:
            return state
    }
}