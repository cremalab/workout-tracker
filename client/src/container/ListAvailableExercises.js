import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { selectExercise } from '../state/actions/selectExercise'
import { bindActionCreators } from 'redux'
import _ from 'lodash'

class ListAvailableExercises extends Component {

    renderList(){
        return _.map(this.props.exercises, exercise => {
            return  (
                <Table.Row>
                    <Table.Cell
                     onClick={() => this.props.selectExercise(exercise)}>
                        {exercise.name}
                    </Table.Cell>
                </Table.Row>
            )
        })
    }

    render(){
        return (
            <Table basic='very'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Movement</Table.HeaderCell>
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
        exercises: state.exercises
    }
}

//long-hand form of passing in { selectExercise } to connect
// const mapDispatchToProps= (dispatch) => {
//     return bindActionCreators({ selectExercise: selectExercise }, dispatch)
// }

export default connect(mapStateToProps, { selectExercise })(ListAvailableExercises)