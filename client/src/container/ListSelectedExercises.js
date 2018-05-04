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
                                    onChange={(event)=>this.handleChange(event, exercise.exerciseKey, key)}/>
                                </Table.Cell>
                            )
                        })
                    } 
                </Table.Row>
            )
        })
    }

    handleChange = (event, exerciseKey, exerciseStatKey) => {
        console.log({[event.target.name]: event.target.value})
        this.props.updateExercise(exerciseKey, exerciseStatKey, event.target.value)
    }
}

const mapStateToProps = (state) => {
    return {
        exercises: state.activeExercises,
    }
}

export default connect(mapStateToProps, { updateExercise })(ListSelectedExercises)