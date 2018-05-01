import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'
import SearchBar from '../SearchBar'
//import ListSearchResults from '../ListSearchResults'
import ListAvailableExercises from '../../container/ListAvailableExercises'
import ListSelectedExercises from '../../container/ListSelectedExercises'

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
            <Form.Field>
              <input type='date'/>
            </Form.Field>
        </Form.Group>
        <Form.Group inline>
          <ListSelectedExercises />
          <ListAvailableExercises/>
        </Form.Group>
        <Form.Field control={Button}>Save</Form.Field>
      </Form>
    )
  }
}

export default FormWorkout