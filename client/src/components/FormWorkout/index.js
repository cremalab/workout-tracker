import React, { Component } from 'react'
import { Button, Checkbox, Form, Input, Radio, Select, TextArea, Search, Grid, Header } from 'semantic-ui-react'
import SearchWorkout from '../SearchWorkout'
import ListSearchResults from '../ListSearchResults'

const options = [
  { key: 'cardio', text: 'Cardio', value: 'cardio' },
  { key: 'strength', text: 'Strength', value: 'strength' },
  { key: 'crossfit', text: 'Crossfit', value: 'crossfit' }
]

class FormWorkout extends Component {
  state = {}

  handleChange = (e, { value }) => this.setState({ value })

  render() {
    const { value } = this.state
    return (
      <Form>
        <Form.Group widths='equal'>
            <SearchWorkout />
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