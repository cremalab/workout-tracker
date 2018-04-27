import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'
import SearchBar from '../SearchBar'
import ListSearchResults from '../ListSearchResults'

// const options = [
//   { key: 'cardio', text: 'Cardio', value: 'cardio' },
//   { key: 'strength', text: 'Strength', value: 'strength' },
//   { key: 'crossfit', text: 'Crossfit', value: 'crossfit' }
// ]

class FormWorkout extends Component {
  render() {
    return (
      <Form>
        <Form.Group widths='equal'>
            <SearchBar />
        </Form.Group>
        <Form.Group inline>
          <ListSearchResults />
        </Form.Group>
        <Form.Field control={Button}>Save</Form.Field>
      </Form>
    )
  }
}

export default FormWorkout