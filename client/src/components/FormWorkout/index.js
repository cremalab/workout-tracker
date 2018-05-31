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
        date: moment(this.props.date).format('YYYY-MM-DD') || //issue: if this.props.date undefined, still returns today's date
              moment(this.props.thisYear + '-' + this.props.thisMonth + '-' + this.props.thisDay).format('YYYY-MM-DD') 
              //|| moment().format('YYYY-MM-DD') 
    }
  }

  render() {
    console.log(this.props.entry)
    return (
      <Form onSubmit={() => this.handleSubmit(this.props.formData)}>
        <Form.Group widths='equal'>
            <SearchBar />
            <Form.Field>
              <input type='date' defaultValue={this.state.date}/>
            </Form.Field>
        </Form.Group>
        <Form.Group inline>
          <ListSelectedExercises savedExercises={this.props.savedExercises}/>
          <ListAvailableExercises />
        </Form.Group>
        <Form.Field 
          control={Button}>
          Save</Form.Field>
      </Form>
    )
  }

  handleSubmit(formData){
    let id = null;
    if(this.props.entry){
      id = this.props.entry._id
    } 

    fetch("/api/workout/save",{
      method: 'POST',
      body: JSON.stringify({
        formData,
        id
      }),
      headers: {
          'Accept': 'application/json, */*',
          'Content': 'application/json'
      }
      }).then(response => {
        //console.log(response);
      })
      .catch(err => console.log('Error: ' + err))
  }

}

const mapStateToProps = (state) =>{
  return{
    formData: state.activeExercises
  }
}

export default connect(mapStateToProps, { saveWorkout })(FormWorkout)