const defaultState = {
    1: {
        key: '1',
        name: 'Run',
        workoutStats:{
          distance: '3 miles',
          time: '15:00 min'
        }
    },
    2: {
        key: '2',
        name: 'Bike',
        workoutStats:{
            distance: '',
            time: ''
        }
    },
    3: {
        key: '3',
        name: 'Row',
        workoutStats:{
            distance: '',
            time: ''
        }
    },
    4: {
        key: '4',
        name: 'Back Squat',
        workoutStats:{
            rounds: '5',
            reps: '3',
            weight: '215 lb'
        }
    },
    5: {
        key: '5',
        name: 'Hang Clean',
        workoutStats:{
            rounds: '',
            reps: '',
            weight: ''
        }
    },
    6: {
        key: '6',
        name: 'Kettlebell Swing',
        workoutStats:{
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
