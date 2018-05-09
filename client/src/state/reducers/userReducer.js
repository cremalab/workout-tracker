//set default state equal to the User model db?
//import User from '../../../models.User.js'
export default function(state = {}, action){
    switch(action.type){
        case 'UPDATE_USER':
            return {...state,
                     // [action.payload.email]: {
                          email: action.payload.email,
                          profilePicId: action.payload.profilePicId
                     // }
                    }
        default:
            return state
    }
}