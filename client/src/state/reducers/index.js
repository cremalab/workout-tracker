import { combineReducers } from 'redux'
import AvailableExercisesReducer from './availableExercisesReducer'
import SelectedExercisesReducer from './selectedExercisesReducer'
import FormReducer from './formReducer'

const rootReducer = combineReducers({
  exercises: AvailableExercisesReducer,
  activeExercises: SelectedExercisesReducer,
  savedForm: FormReducer
});

export default rootReducer;