import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'
import { connect } from 'react-redux'

class ListSelectedExercises extends Component {

    renderList(){
        return this.props.exercise.map( (oneExercise) => {
            return (
                <Table.Row>
                    <Table.Cell>
                        {oneExercise.name}
                    </Table.Cell>
                    {
                        Object.keys(oneExercise.workoutStats).map((key, index) => {
                            return (
                            <Table.Cell>
                                <input defaultValue={key}/>
                            </Table.Cell>
                            )
                        })
                    }
                </Table.Row>
            )
        })
    }

    render(){
        if(this.props.exercise.length === 0){
            return <div>Select a movement to add it to your workout.</div>
        }
        return (
            // <div>
            //     <h3>Workout:</h3>
            //     <div>Name: {this.props.exercise[0].name}</div>
            //     {/* <div>Stats:
            //         {
            //             Object.keys(this.props.exercise[2].workoutStats).map((key, index) => {
            //                 return <div>{this.props.exercise.workoutStats[key]}</div>
            //             })
            //         }
            //     </div> */}
            // </div>
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
}

const mapStateToProps = (state) => {
    return {
        exercise: state.activeExercise
    }
}

export default connect(mapStateToProps)(ListSelectedExercises)