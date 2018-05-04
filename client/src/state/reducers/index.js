import { combineReducers } from 'redux'
import AvailableExercisesReducer from './availableExercisesReducer'
import SelectedExercisesReducer from './selectedExercisesReducer'
import FormReducer from './formReducer'
//import {reducer as formReducer} from 'redux-form'

const rootReducer = combineReducers({
  exercises: AvailableExercisesReducer,
  activeExercises: SelectedExercisesReducer,
  form: FormReducer,
});

export default rootReducer;