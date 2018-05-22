import React, { Component } from 'react'
import styled from 'styled-components';
import { Table, Header, Icon } from 'semantic-ui-react'
import moment from 'moment';
import { connect } from 'react-redux';
import { weekUtil, weekDateArray } from '../../utils/dateUtil'
import ButtonGroup from '../ButtonGroup'

class CalendarWeek extends Component {
    constructor(props){
        super(props)
        this.state = {
            startDate: moment().startOf('week'),
            //endDate: moment().endOf('week').format("MM/DD/YYYY"),
            thisWeekWorkout: ''
        }
        let url = `/api/workout/eva@gmail.com/${this.state.startDate}`
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content': 'application/json'
            }
        })
        .then(response => {
            return response.json()
        })
        .then((data) => {
            this.setState({thisWeekWorkout: data})
        })
    }

    renderHeaderRow = () =>{
        const { startDate } = this.state
        return (
            weekDateArray(startDate).map((day) =>{
                return <Table.HeaderCell>{day}</Table.HeaderCell>
            })
        )
    }

    renderWorkouts = () =>{
        const { startDate, thisWeekWorkout } = this.state;
        let week = weekDateArray(startDate)
        let myWerk = [{ date: "Sun 20", name:"Hike" }, { date: "Mon 21", name: "Zumba" }]
        let result = myWerk.find( day => day.date==="Sun 20")
        console.log(result)
        return (
            //loop through array of each day that has workout
            thisWeekWorkout.map((workout) => {
                console.log('workout.date: ' + workout.date)
                //loop through workout object to get name of each exercise logged
               return (
                    Object.values(workout.workout).map((exercise) =>{
                        return <Table.Cell>{exercise.exerciseName}</Table.Cell>
                    })
                )
            })
        )
    }

    renderWorkoutDay = () =>{
        //for now, assume just one 
        //return one cell (within only that specific day column) for each movement
        return (
            <Table.Row>
                <Table.Cell></Table.Cell>
            </Table.Row>
            //Will be looping so could essentially return multiple 
            //for multiple movements that day
            // <Table.Row>
            //     <Table.Cell></Table.Cell>
            // </Table.Row>
        )
    }

    renderWorkoutWeek = () =>{
        //return all columns renderWorkoutDay * 7
        //if undefined, return nothing
    }

    render() {
        const { thisWeekWorkout } = this.state
        if(!thisWeekWorkout.length) return null
        return (
            <div>
                <ButtonGroup />
                <HeaderWrapper>
                    <Header floated='left' style={HeaderArrow}>
                        <Icon name="arrow left" size="big" onClick={this.previousMonth}/>
                    </Header>
                    <Title>
                     
                    </Title>
                    <Header floated='right' style={HeaderArrow}>
                     <Icon name="arrow right" size="big" onClick={this.nextMonth}/>
                    </Header>
                </HeaderWrapper>
                <Table celled unstackable>
                    <Table.Header>
                        <Table.Row>
                            {this.renderHeaderRow()}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            {/* needs to somehow iterate over cells, knowing where to place */}
                            {this.renderWorkouts()}
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>
        );
    }
}
const HeaderWrapper = styled.div`
    height: 80px;
    width: 95%;
    margin: 3%;
    overflow: hidden;
`;

const HeaderArrow = {
    color: "#FA8072", 
    paddingTop: "5%"
};

const Title = styled.span`
    position: absolute;
    font-family: Helvetica;
    font-size: 3em;
    color: #FA8072;
    text-align: center;
    margin-top: 5%;
    font-weight: bold;
    text-transform: uppercase;
`;

const mapStateToProps = (state) =>{
    return {
        user: state.user
    }
}
export default connect(mapStateToProps)(CalendarWeek);
