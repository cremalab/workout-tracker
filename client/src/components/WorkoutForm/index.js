import React, { Component } from 'react'
import { Button, Checkbox, Form, Input, Radio, Select, TextArea, Search, Grid, Header } from 'semantic-ui-react'
import WorkoutSearch from '../WorkoutSearch'
import ResultList from '../ResultList'

const options = [
  { key: 'cardio', text: 'Cardio', value: 'cardio' },
  { key: 'strength', text: 'Strength', value: 'strength' },
  { key: 'crossfit', text: 'Crossfit', value: 'crossfit' }
]

class WorkoutForm extends Component {
  state = {}

  handleChange = (e, { value }) => this.setState({ value })

  render() {
    const { value } = this.state
    return (
      <Form>
        <Form.Group widths='equal'>
            <WorkoutSearch />
        </Form.Group>
        <Form.Group inline>
          <ResultList />
        </Form.Group>
        <Form.Field control={Button}>Submit</Form.Field>
      </Form>
    )
  }
}

export default WorkoutForm