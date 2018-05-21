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
            endDate: moment().endOf('week').format("MM/DD/YYYY")
        }
    }

    render() {
        const { startDate, endDate } = this.state
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
                          {weekDateArray(startDate).map((day) =>{
                               return <Table.HeaderCell>{day}</Table.HeaderCell>
                          })}
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

    fetchWorkouts = () =>{
        //fetch api call to look thru saved workouts for this user
        //if there is a date that falls in selected date, return it
        //build up array for each day of week that way this is reusable for day view
        let url = '/api/workout/' + this.props.user.email
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content': 'application/json'
            }
        }).then(response => {
            return response.json()
        }).then(data => {
            // this.setState({ profilePicId: data.profilePicId })
            //build up workout array for this user/week
            let thisWeekWorkout = [{name: 'Run'}, {name: 'Bike'}]
            this.renderWorkouts(thisWeekWorkout)
        })

    }

    renderWorkouts = () =>{
        let thisWeekWorkout = [{name: 'Run'}, {name: 'Bike'}]
        return (
            thisWeekWorkout.map((workout) => {
                return <Table.Cell>{workout.name}</Table.Cell>
            })
        )
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
