import React, { Component } from 'react'
import styled from 'styled-components';
import { Table, Header, Icon, Segment, Modal } from 'semantic-ui-react'
import moment from 'moment';
import _ from 'lodash'
import { connect } from 'react-redux';
import { weekUtil, weekDateArray } from '../../utils/dateUtil'
import ButtonGroup from '../ButtonGroup'
import FormWorkout from '../FormWorkout'

class CalendarWeek extends Component {
    constructor(props){
        super(props)
        this.state = {
            startDate: moment().startOf('week'),
            thisWeekWorkout: ''
        }
        this.fetchWorkouts()
    }

    fetchWorkouts = () => {
            //issue: un-hardcode email once feature-profile-page branch is merged
            let url = `/api/workout/mandy@crema.us/${this.state.startDate}`
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
                data.sort((a,b) => { //sort workout entries by date
                    return a.date-b.date
                })
                this.setState({thisWeekWorkout: data})
            })
    }

    previousWeek = () =>{
        this.setState({
            startDate: this.state.startDate.clone().subtract(7, 'days')
        })
    }

    nextWeek = () =>{
        this.setState({
            startDate: this.state.startDate.clone().add(7, 'days')
        })
    }

    renderHeaderRow = () =>{
        const { startDate } = this.state
        return (
            weekDateArray(startDate).map((day) =>{
                return <Table.HeaderCell>{day.format("ddd DD")}</Table.HeaderCell>
            })
        )
    }

    determineWorkoutDates = () =>{
        const { thisWeekWorkout } = this.state;
        let workoutDates = []
        //array of dates this week that have a workout logged
        thisWeekWorkout.map((workout) => {
            workoutDates.push(workout.date)
        });
        return workoutDates
    }

    //issue: break up into smaller functions
    renderWorkouts = () =>{
        const { startDate, thisWeekWorkout } = this.state;
        let weekDates = weekDateArray(startDate).map((date) =>{
            return date.valueOf() //convert moment date object to UNIX time in milliseconds
        })
        console.log('weekDates: ' + weekDates)

        let workoutDates = this.determineWorkoutDates()
        console.log('workoutDates: ' + workoutDates)

        let exercises = []
        let entryArray = []
        let cellsToRender = [<Table.Cell></Table.Cell>,
                            <Table.Cell></Table.Cell>,
                            <Table.Cell></Table.Cell>,
                            <Table.Cell></Table.Cell>,
                            <Table.Cell></Table.Cell>,
                            <Table.Cell></Table.Cell>,
                            <Table.Cell></Table.Cell>]
        
        //return array of date values where weekDates and workoutDates match
        let intersection = _.intersection(weekDates, workoutDates)
        console.log('intersection: ' + intersection)

        //loop through weekDates, return the index from weekDates where a date value matches
        let matchingIndexArray = []
        for(let value of intersection){
            console.log('value:' + value, typeof value)
            matchingIndexArray.push(weekDates.indexOf(value)) //creates array of matching indexes (ie [0, 3, 6])
        }
        console.log('matchingIndexArray: ' + matchingIndexArray)

        thisWeekWorkout.map((entry) => { //for each entry this week
            entryArray.push(entry)
            Object.values(entry.workout).map((exercise) =>{ //for each workout logged to one day
                exercises.push(exercise)        
            })
        })

        thisWeekWorkout.map((entry) => { //for each entry this week
            console.log('entry.date: ' + entry.date)
            for(let i=0; i < intersection.length; i++){ //for as many times as there are workouts logged
                weekDates.map(date =>{ //for each date of the week
                    if(entry.date === date){ //if there's a workout logged on that day
                        console.log(i)
                        cellsToRender[matchingIndexArray[i]] = 
                            <Modal 
                                trigger={<Table.Cell>
                                            {exercises[i]['exerciseName']}
                                            <Icon name="trash" onClick={ event => this.handleDelete(event, entryArray[i]['_id']) } />
                                        </Table.Cell>} 
                                style={{marginTop: "10%", marginLeft: "10%", marginRight: "10%"}}>
                                 <Modal.Header>Log Workout</Modal.Header>
                                 <Modal.Content image>
                                 <Modal.Description>
                                     <Header></Header>
                                        <FormWorkout 
                                            date={workoutDates[i]} 
                                            savedExercises={exercises[i]}
                                            entry={entryArray[i]}
                                        />
                                 </Modal.Description>
                                 </Modal.Content>
                            </Modal>
                            
                        console.log(entry.workout)
                    }       
                })
            }
        })
        return cellsToRender
    }

    handleDelete = (event, id) =>{
        event.stopPropagation()
        console.log(id)
        let url = '/api/workout/delete/' + id
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content': 'application/json'
            }
        }).then(
            this.fetchWorkouts()
        )
    }

    render(){
        const { thisWeekWorkout } = this.state
        console.log('thisWeekWorkout: ' + thisWeekWorkout)
        if(!thisWeekWorkout.length) return (
            <Table celled unstackable>
                    <Table.Header>
                        <Table.Row>
                            {this.renderHeaderRow()}
                        </Table.Row>
                    </Table.Header>
            </Table>
        )
        return (
            <div>
                <ButtonGroup />
                <HeaderWrapper>
                    <Header floated='left' style={HeaderArrow}>
                        <Icon name="arrow left" size="big" onClick={this.previousWeek}/>
                    </Header>
                    <Title>
                     
                    </Title>
                    <Header floated='right' style={HeaderArrow}>
                     <Icon name="arrow right" size="big" onClick={this.nextWeek}/>
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