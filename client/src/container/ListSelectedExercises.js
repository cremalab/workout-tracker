import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { updateExercise } from '../state/actions/updateExercise'
import { selectExercise } from '../state/actions/selectExercise';

class ListSelectedExercises extends Component {
    constructor(props){
        super(props)
        // let url = '/api/users/profilePic/' + this.props.user.email
        //     fetch(url, {
        //         method: 'GET',
        //         headers: {
        //             'Accept': 'application/json, text/plain, */*',
        //             'Content': 'application/json'
        //         }
        //     }).then(response => {
        //         return response.json()
        //     }).then(data => {
        //         this.setState({ profilePicId: data.profilePicId })
        //     })

    }

    render(){
        if(this.props.exercises.length === 0){
            return <div>Select a movement to add it to your workout.</div>
        }
        
        //if user clicks on existing workout to edit it, dispatch action to pre-populate
        if(this.props.savedExercises){
            this.props.selectExercise(this.props.savedExercises)
            this.props.updateExercise
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
                        Object.entries(exercise.exerciseStats).map( statItem => {
                            return (
                                <Table.Cell>
                                <input 
                                    placeholder={statItem[0]} 
                                    value ={statItem[1]}
                                    name={exercise.exerciseName + '.' + statItem[0]}
                                    onChange={(event)=>this.handleChange(event, exercise.exerciseKey, statItem[0])}/>
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

export default connect(mapStateToProps, { updateExercise, selectExercise })(ListSelectedExercises)