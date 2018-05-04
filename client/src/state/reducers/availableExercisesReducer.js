const defaultState = {
    1: {
        key: '1',
        name: 'Run',
        exerciseStats:{
          distance: '',
          time: ''
        }
    },
    2: {
        key: '2',
        name: 'Bike',
        exerciseStats:{
            distance: '',
            time: ''
        }
    },
    3: {
        key: '3',
        name: 'Row',
        exerciseStats:{
            distance: '',
            time: ''
        }
    },
    4: {
        key: '4',
        name: 'Back Squat',
        exerciseStats:{
            rounds: '',
            reps: '',
            weight: ''
        }
    },
    5: {
        key: '5',
        name: 'Hang Clean',
        exerciseStats:{
            rounds: '',
            reps: '',
            weight: ''
        }
    },
    6: {
        key: '6',
        name: 'Kettlebell Swing',
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
