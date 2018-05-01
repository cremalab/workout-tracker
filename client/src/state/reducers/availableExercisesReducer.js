const defaultState = [
    {
        key: '1',
        name: 'Run',
        description: '',
        workoutStats:{
          distance: '3 miles',
          time: '15:00 min'
        }
    },
    {
        key: '2',
        name: 'Bike',
        description: '',
        workoutStats:{
            distance: '',
            time: ''
        }
    },
    {
        key: '3',
        name: 'Row',
        description: '',
        workoutStats:{
            distance: '',
            time: ''
        }
    },
    {
        key: '4',
        name: 'Back Squat',
        description: '',
        workoutStats:{
            rounds: '5',
            reps: '3',
            weight: '215 lb'
        }
    },
    {
        key: '5',
        name: 'Hang Clean',
        description: '',
        workoutStats:{
            rounds: '',
            reps: '',
            weight: ''
        }
    },
    {
        key: '6',
        name: 'Kettlebell Swing',
        description: '',
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
