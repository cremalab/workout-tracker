import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'
import SearchBar from '../SearchBar'
import ListAvailableExercises from '../../container/ListAvailableExercises'
import ListSelectedExercises from '../../container/ListSelectedExercises'
import { connect } from 'react-redux'
import { saveExercise } from '../../state/actions/saveAction'
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
      <Form onSubmit={event => this.handleSubmit(event)}>
        <Form.Group widths='equal'>
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
          control={Button}>Save</Form.Field>
      </Form>
    )
  }
  handleSubmit(event){
    event.preventDefault();
    //console.log(this.props.formData)
    let formDataObject = {}
    for(let object of this.props.formData){
      //console.log('object: ' + object)
      for(let key in object){
        if(key ==='name'){
        //   //console.log(object[objectIndex])
        //   formDataObject = object[key]
          formDataObject[key] = object[key]
          console.log(key)
          console.log(object[key])
        }
      } 
      
    }
    console.log(formDataObject)
    fetch("/api/workout/save",{
      method: 'POST',
      body: JSON.stringify({
        name: 'Pole Vault'
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