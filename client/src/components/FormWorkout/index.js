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
        <Form.Field 
          onClick={this.handleSave}
          control={Button}>Save</Form.Field>
      </Form>
    )
  }
  handleSave = (event) => {
    const { workout } = this.state;
        fetch("/api/workout/save",{
          method: 'POST',
          body: JSON.stringify({
            workout
          }),
          headers: {
            'Accept': 'application/json, */*',
            'Content': 'application/json',
          }
        }).then(response => {
          console.log(response);
        })
        .catch(err => console.log('Error: ' + err))
        event.preventDefault();
  }
}

export default FormWorkout