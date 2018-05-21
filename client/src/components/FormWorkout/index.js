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
      <Form onSubmit={() => this.handleSubmit(this.props.formData)}>
        <Form.Group widths='equal'>
            <SearchBar />
            <Form.Field>
              <input 
                type='date' 
                defaultValue={this.state.date}/>
            </Form.Field>
        </Form.Group>
        <Form.Group inline>
          <ListSelectedExercises />
          <ListAvailableExercises/>
        </Form.Group>
        <Form.Field 
          control={Button}
          onClick={console.log(this.props.handleClose)}>
          Save</Form.Field>
      </Form>
    )
  }
  handleSubmit(formData){
    fetch("/api/workout/save",{
      method: 'POST',
      body: JSON.stringify({
        user: this.props.user,
        date: this.state.date,
        formData
      }),
      headers: {
          'Accept': 'application/json, */*',
          'Content': 'application/json',
      }
      }).then(response => {
        //console.log(response);
      })
      .catch(err => console.log('Error: ' + err))
  }
}

const mapStateToProps = (state) =>{
  return{
    formData: state.activeExercises,
    user: state.user
  }
}

export default connect(mapStateToProps, { saveWorkout })(FormWorkout)