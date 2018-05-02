import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'
import SearchBar from '../SearchBar'
import ListAvailableExercises from '../../container/ListAvailableExercises'
import ListSelectedExercises from '../../container/ListSelectedExercises'
import { connect } from 'react-redux'
import { saveExercise } from '../../state/actions/saveAction'

class FormWorkout extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <Form onSubmit={event => this.handleSubmit(event)}>
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
          control={Button}>Save</Form.Field>
      </Form>
    )
  }
  handleSubmit(event){
    event.preventDefault();
    //console.log(this.props.formData)
    let formDataObject = {}
    for(let object of this.props.formData){
      console.log(object)
      for(let objectIndex in object){
        //if(objectIndex==='name'){
          //console.log(object[objectIndex])
          formDataObject = object
          console.log(formDataObject)
        //}
      } 
    }
    fetch("/api/workout/save",{
      method: 'POST',
      body: JSON.stringify({
        formDataObject
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

const mapStateToProps = (state) =>{
  return{
    formData: state.activeExercise
  }
}

export default connect(mapStateToProps, { saveExercise })(FormWorkout)