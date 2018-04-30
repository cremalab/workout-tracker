import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'
import SearchBar from '../SearchBar'
import ListSearchResults from '../ListSearchResults'

const availableWorkouts = [
  {
      key: '1',
      name: 'Run',
      description: '',
      distance: '',
      time: ''
  },
  {
      key: '2',
      name: 'Bike',
      description: '',
      distance: '',
      time: ''
  },
  {
      key: '3',
      name: 'Row',
      description: '',
      distance: '',
      time: ''
  },
  {
      key: '4',
      name: 'Back Squat',
      description: '',
      rounds: '',
      reps: '',
      weight: ''
  },
  {
      key: '5',
      name: 'Hang Clean',
      description: '',
      rounds: '',
      reps: '',
      weight: ''
  },
  {
      key: '6',
      name: 'Kettlebell Swing',
      description: '',
      rounds: '',
      reps: '',
      weight: ''
  }
]

class FormWorkout extends Component {
  constructor(props){
    super(props)
    this.state = {
      workouts: []
    }
  }
  render() {
    return (
      <Form>
        <Form.Group widths='equal'>
            <SearchBar />
        </Form.Group>
        <Form.Group inline>
          <ListSearchResults workouts={this.state.workouts}/>
        </Form.Group>
        <Form.Field control={Button}>Save</Form.Field>
      </Form>
    )
  }
}

export default FormWorkout