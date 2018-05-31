import React, { Component } from 'react'
import styled from 'styled-components';
import { Table, Header, Icon, Segment, Modal } from 'semantic-ui-react'
import moment from 'moment';
import _ from 'lodash'
import { connect } from 'react-redux';
import { weekUtil, weekDateArray } from '../../utils/dateUtil'
import ButtonGroup from '../ButtonGroup'
import FormWorkout from '../FormWorkout'
import CalendarHeader from '../CalendarHeader';
import CalendarTableHeader from '../CalendarTableHeader';

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

    determineWorkoutDates = () =>{
        const { thisWeekWorkout } = this.state;
        let workoutDates = []
        //array of dates this week that have a workout logged
        thisWeekWorkout.map((workout) => {
            workoutDates.push(workout.date)
        });
        return workoutDates
    }

    previousWeek = () =>{
        this.setState({
            startDate: this.state.startDate.clone().subtract(7, 'days')
        })
        this.fetchWorkouts()
    }
    
    nextWeek = () =>{
        this.setState({
            startDate: this.state.startDate.clone().add(7, 'days')
        })
        this.fetchWorkouts()
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
        console.log("next startDate: " + this.state.startDate)
        console.log('LEN: ' + thisWeekWorkout.length)
        if(!thisWeekWorkout.length) {
            return (
                <div>
                    <CalendarHeader 
                        nextWeek={this.nextWeek}
                        previousWeek={this.previousWeek}/>
                    <Table celled unstackable>
                        <CalendarTableHeader
                            startDate={this.state.startDate} />
                    </Table>
                </div>
            )
        }
        return (
            <div>
                <CalendarHeader 
                    nextWeek={this.nextWeek}
                    previousWeek={this.previousWeek}/>
                <Table celled unstackable>
                    <CalendarTableHeader
                        startDate={this.state.startDate} />
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

const mapStateToProps = (state) =>{
    return {
        user: state.user
    }
}
export default connect(mapStateToProps)(CalendarWeek);
