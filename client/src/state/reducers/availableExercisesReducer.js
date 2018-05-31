const defaultState = {
    1: {
        exerciseKey: '1',
        exerciseName: 'Run',
        exerciseStats:{
          distance: '',
          time: ''
        }
    },
    2: {
        exerciseKey: '2',
        exerciseName: 'Bike',
        exerciseStats:{
            distance: '',
            time: ''
        }
    },
    3: {
        exerciseKey: '3',
        exerciseName: 'Row',
        exerciseStats:{
            distance: '',
            time: ''
        }
    },
    4: {
        exerciseKey: '4',
        exerciseName: 'Back Squat',
        exerciseStats:{
            rounds: '',
            reps: '',
            weight: ''
        }
    },
    5: {
        exerciseKey: '5',
        exerciseName: 'Hang Clean',
        exerciseStats:{
            rounds: '',
            reps: '',
            weight: ''
        }
    },
    6: {
        exerciseKey: '6',
        exerciseName: 'Kettlebell Swing',
        exerciseStats:{
            rounds: '',
            reps: '',
            weight: ''
        }
    }
}

export default function(state = defaultState, action){
    switch(action.type){
        //future use: allow user to add custom exercise
        // case 'ADD_EXERCISE':
        //     return state
        case 'SELECT_EXERCISE':
            return state
        default: 
            return state
    }
}
