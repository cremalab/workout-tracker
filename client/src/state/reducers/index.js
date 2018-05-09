import { combineReducers } from 'redux'
import userReducer from './userReducer';
// import AvailableExercisesReducer from './availableExercisesReducer'
// import SelectedExercisesReducer from './selectedExercisesReducer'


const rootReducer = combineReducers({
//   exercises: AvailableExercisesReducer,
//   activeExercises: SelectedExercisesReducer,
    user: userReducer
});

export default rootReducer;