import React, { Component } from 'react';
import {Icon, TableHeaderCell, Table } from 'semantic-ui-react';
import Moment from 'moment';
import {extendMoment} from 'moment-range';

const moment = extendMoment(Moment);

class Calendar extends Component {
    constructor(props){
        super(props);
        this.state={
            month: moment().month(),
            year: moment().year(),        
        }
    }
    // componentDidMount(){
    //     this.getStartDay();
    // }

    // getStartDay = () => {
    //     console.log(this.state.startOfMonth);
    //     if(this.state.startOfMonth === "Sun"){
    //        this.setState({startDay: 0})
    //     }
    // }

    // getCalendar(){
    //     let startDate = moment().format(),
    //         firstDate = moment().startOf('month'),
    //         lastDate = moment().endOf('month');
    //        // monthRange = moment.range(firstDate, lastDate);
    // }

    previousMonth = ()=>{
        let month, year;
        if(this.state.month === 0){
            month = 11;
            year = this.state.year - 1;
        } else {
            month = this.state.month - 1
            year = this.state.year;
        }
        this.setState({
            month,
            year
        });
        console.log('this.state.month: ' + this.state.month);
    }
    nextMonth = ()=>{
        let month, year;
        if (this.state.month == 11){
        	month = 0;
            year = this.state.year + 1;
        }
        else{
        	month = this.state.month + 1;
            year = this.state.year;
        }
        this.setState({
        	month,
            year
        });
    }

    render(){
        let daysOfWeek = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"],
            year = this.state.year,
            month = this.state.month,
            startDate = moment([year, month]),
            firstOfMonth = moment(startDate).clone().startOf('month'),
            firstOfMonthDate = firstOfMonth.date(),
            firstOfMonthDay = firstOfMonth.day(),
            lastOfMonth = moment(startDate).clone().endOf('month'),
            lastOfMonthDate = lastOfMonth.date(),
            lastOfMonthDay = lastOfMonth.day(),
            daysInMonth = moment([year, month]).daysInMonth(),
            weeksInMonth = Math.floor((firstOfMonthDay + daysInMonth)/7),
            weeks = [];
            
        {   let week = [],
                daysToAdd,
                currentWeek = firstOfMonth.clone().day(firstOfMonthDay),
                currentDay = parseInt(currentWeek.format('D'));
                console.log('firstOfMONTH TOP: ' + firstOfMonth.toString());
                console.log('weeksInMonth: ' + weeksInMonth);
            while(currentWeek < lastOfMonth){
                //add blank days to first week
                if(currentDay === 1){
                    for(var i = 0; i < firstOfMonthDay; i++){
                        let blank = '';     
                        week.push(blank);
                    }
                }

                //determine how many days to add after any necessary blanks have been added
                if(currentDay === 1){//if first week of month 
                    daysToAdd = 8 - week.length;
                } else if (weeks.length >= weeksInMonth){//if last week of month
                    if(lastOfMonthDay === 0){ //if month ends on Sunday
                        daysToAdd = currentDay + (lastOfMonthDate - currentDay) + 1;
                        console.log('EQUAL','lastOfMonthDate' + lastOfMonthDate ,'currDay: '+ currentDay,'daystoADD: ' +daysToAdd);
                    } else {
                        daysToAdd = currentDay + (lastOfMonthDate - currentDay) + 1;
                    }
                } else {
                    daysToAdd = currentDay + 7;
                }

                //add remaining days after blanks
                for(var i = currentDay; i < daysToAdd; i++){
                    week.push(i); 
                }

                //determine how to increment currentDay and currentWeek
                if(currentDay === 1){
                    currentDay = currentDay + (7- firstOfMonthDay);
                    currentWeek.add(7, 'day');
                } else if ((weeks.length + 1) >= weeksInMonth){ //if last week of month
                    currentDay = currentDay + 7;
                    if(lastOfMonthDay === 6){ //if month ends on Saturday
                        currentWeek.add( 6 , 'day');
                    } else if (lastOfMonthDay === 0){ //if month ends on Sunday
                        currentWeek.add( 1 , 'day');
                    } else if (lastOfMonthDay === 1){ //if month ends on Monday
                        currentWeek.add( 2 , 'day');
                    } else {
                        currentWeek.add((6 - lastOfMonthDay), 'day');
                    }
                } else {
                    currentDay = currentDay + 7;
                    currentWeek.add(7, 'day');
                }
                weeks.push([week]); 
                week = [];
            }
        }
        
        return(
            <div>
                <Icon name="arrow left"  onClick={this.previousMonth}/>
                <Icon name="arrow right"  onClick={this.nextMonth}/>
                <p> Month: {this.state.month + 1} </p>
                <p> Year: {this.state.year} </p>
                <Table celled inverted>
                    <Table.Header>
                    <Table.Row>
                        {daysOfWeek.map((dayName)=>{
                            return <Table.HeaderCell>{dayName}</Table.HeaderCell>
                        })}
                    </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {weeks.map(([subweek]) => {
                        return (
                            <Table.Row>
                                {subweek.map((day) => {
                                    return(
                                        <Table.Cell>{day}</Table.Cell>
                                    );
                                })}
                            </Table.Row>
                        );
                    })}
                    </Table.Body>
                </Table>
            </div>
        );
    }
}

export default Calendar;