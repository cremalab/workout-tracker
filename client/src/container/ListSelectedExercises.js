import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { saveExercise } from '../state/actions/saveAction'
import _ from 'lodash'

class ListSelectedExercises extends Component {

    render(){
        if(this.props.exercise.length === 0){
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

    renderList(exerciseData) {
        return this.props.exercise.map( (oneExercise) => {
            return (
                <Table.Row>
                    <Table.Cell>
                        {oneExercise.name}
                    </Table.Cell>
                    { console.log(
                        Object.entries(
                           oneExercise.workoutStats
                        )
                        )
                    }
                    {
                        Object.entries(oneExercise.workoutStats).map((key) => {
                            return (
                                <Table.Cell>
                                    <input placeholder={key} name={oneExercise.name + '.' + key} onChange={this.handleChange}/>
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
        saveExercise({[event.target.name]: event.target.value});
    }
}

const mapStateToProps = (state) => {
    return {
        exercise: state.activeExercise
    }
}

export default connect(mapStateToProps, { saveExercise })(ListSelectedExercises)