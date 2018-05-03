const defaultState = [
    {
        key: '1',
        name: 'Run',
        workoutStats:{
          distance: '3 miles',
          time: '15:00 min'
        }
    },
    {
        key: '2',
        name: 'Bike',
        workoutStats:{
            distance: '',
            time: ''
        }
    },
    {
        key: '3',
        name: 'Row',
        workoutStats:{
            distance: '',
            time: ''
        }
    },
    {
        key: '4',
        name: 'Back Squat',
        workoutStats:{
            rounds: '5',
            reps: '3',
            weight: '215 lb'
        }
    },
    {
        key: '5',
        name: 'Hang Clean',
        workoutStats:{
            rounds: '',
            reps: '',
            weight: ''
        }
    },
    {
        key: '6',
        name: 'Kettlebell Swing',
        workoutStats:{
            rounds: '',
            reps: '',
            weight: ''
        }
    }
]

export default function(state = defaultState, action){
    switch(action.type){
        case 'ADD_EXERCISE':
            return state
        case 'SELECT_EXERCISE':
            return state
        default: 
            return state
    }
}
