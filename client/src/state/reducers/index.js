import { combineReducers } from 'redux'
import AvailableExercisesReducer from './availableExercisesReducer'
import SelectedExercisesReducer from './selectedExercisesReducer'


const rootReducer = combineReducers({
  exercises: AvailableExercisesReducer,
  activeExercises: SelectedExercisesReducer,
});

export default rootReducer;