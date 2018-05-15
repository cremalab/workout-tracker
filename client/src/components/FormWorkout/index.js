import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'
import SearchBar from '../SearchBar'
import ListAvailableExercises from '../../container/ListAvailableExercises'
import ListSelectedExercises from '../../container/ListSelectedExercises'
import { connect } from 'react-redux'
import { saveWorkout } from '../../state/actions/saveWorkout'
import moment from 'moment'

class FormWorkout extends Component {
  constructor(props){
    super(props)
    this.state = {
        date: moment().format(this.props.thisYear + '-' + this.props.thisMonth + '-' + this.props.thisDay) || moment().format('YYYY-MM-DD')
    }
  }

  render() {
    return (
      <Form>
        <Form.Group>
            <SearchBar />
            <Form.Field>
              <input type='date' defaultValue={this.state.date}/>
            </Form.Field>
        </Form.Group>
        <Form.Group inline>
          <ListSelectedExercises />
          <ListAvailableExercises/>
        </Form.Group>
        <Form.Field 
         type='button'
          control={Button}
          onClick={() => this.handleSubmit(this.props.formData)}>
          Save</Form.Field>
      </Form>
    )
  }

  handleSubmit(formData){
    fetch("/api/workout/save",{
      method: 'POST',
      body: JSON.stringify({
        formData
      }),
      headers: {
          'Accept': 'application/json, */*',
          'Content': 'application/json',
      }
      }).then(
        this.props.handleClose
      )
      .catch(err => console.log('Error: ' + err))
  }
}

const mapStateToProps = (state) =>{
  return{
    formData: state.activeExercises
  }
}

export default connect(mapStateToProps, { saveWorkout })(FormWorkout)