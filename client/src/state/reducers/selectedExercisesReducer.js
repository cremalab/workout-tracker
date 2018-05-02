import _ from 'lodash'

//state is not application state, only the state this reducer is responsible for
export default function(state = [], action){
    switch(action.type){
        case 'SELECT_EXERCISE':
            //return state.concat([action.payload])
            return [ action.payload, ...state ]
        case 'ADD_EXERCISE':
            return state
        case 'SAVE_EXERCISE':
            //needs to return the array of selected exercises like 'SELECT_EXERCISE' is doing
            //but with the event.target.value of the input fields filled out
            //now has access to event object
            //for now just save the all the names of the selected workouts? [{name: ''}, {name: ''}]
            return state
        default:
            return state
    }
}