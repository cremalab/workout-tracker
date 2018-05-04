import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { updateExercise } from '../state/actions/updateExercise'
import _ from 'lodash'
import { selectExercise } from '../state/actions/selectExercise';

class ListSelectedExercises extends Component {

    render(){
        if(this.props.exercises.length === 0){
            return <div>Select a movement to add it to your workout.</div>
        }
        return (
            <Table basic='very'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>My Workout</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.renderList()}   
                </Table.Body>
            </Table>
                
        )
    }

    renderList() {
        return _.map(this.props.exercises, exercise => {
            return (
                <Table.Row>
                    <Table.Cell>
                        {exercise.exerciseName}
                    </Table.Cell>
                    {
                        Object.keys(exercise.exerciseStats).map( key => {
                            return (
                                <Table.Cell>
                                <input 
                                    placeholder={key} 
                                    name={exercise.exerciseName + '.' + key}
                                    //make controlled input field that recieves value from state
                                    //when state changes should update?
                                    //it's receiving value from state but state is not getting updated
                                    //value={this.props.exercises.exerciseStats} 
                                    onChange={this.handleChange}/>
                                </Table.Cell>
                            )
                        })
                    } 
                </Table.Row>
            )
        })
    }

    handleChange = (event) => {
        console.log({[event.target.name]: event.target.value})
        //console.log(this.props.exercise.exerciseStats)
        //call select exercise again and pass in values for workoutStats this time?
        //equivalent of setState() for redux
        //what parameters to pass? just exercise? but that hasn't been updated. need more parameters?
        updateExercise(event.target.name, event.target.value)
    }
}

const mapStateToProps = (state) => {
    return {
        exercises: state.activeExercises,
    }
}

export default connect(mapStateToProps, { updateExercise })(ListSelectedExercises)