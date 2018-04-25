import React, { Component } from 'react';
import {Icon, TableHeaderCell, Table } from 'semantic-ui-react';
import Moment from 'moment';
import {extendMoment} from 'moment-range';

const moment = extendMoment(Moment);

class Calendar extends Component {
    constructor(props){
        super(props);
        this.state={
            startOfMonth: moment().clone().startOf('month').format("ddd").toString(),
            endOfMonth: moment().clone().endOf('month').format("ddd").toString(),
            startDay: '',
        }
    }
    componentDidMount(){
        this.getStartDay();
    }

    getStartDay = () => {
        console.log(this.state.startOfMonth);
        if(this.state.startOfMonth === "Sun"){
           this.setState({startDay: 0})
        }
    }

    // getCalendar(){
    //     let startDate = moment().format(),
    //         firstDate = moment().startOf('month'),
    //         lastDate = moment().endOf('month');
    //        // monthRange = moment.range(firstDate, lastDate);
    // }

    render(){
        let daysOfWeek = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"],
            year = 2017,
            month = 8,
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
                console.log('currentWEEK TOP: ' + currentWeek.toString());
                console.log('LASTOF MONTH date TOP: ' + lastOfMonthDate);
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
                    console.log(lastOfMonthDay);
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
                //console.log('week after week.push(i): ' + week);

                //determine how to increment currentDay and currentWeek
                if(currentDay === 1){
                    currentDay = currentDay + (7- firstOfMonthDay);
                    //console.log('currentDay FIRST WEEK INC: ' + currentDay);
                    currentWeek.add(7, 'day');
                } else if ((weeks.length + 1) >= weeksInMonth){ //if last week of month
                    currentDay = currentDay + 7;
                    //console.log('currentDay LAST WEEK: ' + currentDay);
                    if(lastOfMonthDay === 6){ //if month ends on a Saturday
                        currentWeek.add( 6 , 'day');
                    } 
                    else if(lastOfMonthDay === 0){ //if month ends on a Sunday
                        //console.log('currentWEEK LAST WEEK INC: ' + currentWeek.toString());
                        currentWeek.add( 1 , 'day');
                        //console.log('currentWEEK LAST WEEK INC AFT: ' + currentWeek.toString());
                    } 
                    else {
                        currentWeek.add((6 - lastOfMonthDay), 'day');
                    }
                } else {
                    currentDay = currentDay + 7;
                    //console.log('currentDay MID WEEK INC: ' + currentDay);
                    //console.log('currentWEEK MID MONTH: ' + currentWeek.toString());
                    currentWeek.add(7, 'day');
                    //console.log('currentWEEK MID MONTH INC AFT: ' + currentWeek.toString());
                }
                weeks.push([week]); 
                //console.log('weeks.length: ' + weeks.length);
                week = [];
            }
            console.log('weeks:' + weeks);
        }
        
        return(
            <div>
                <Icon name="arrow left"  />
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

    // previous = ()=>{
    //     this.setState({month: Moment().subtract(1,"month").format("MM")});
    //     console.log(this.state.month);
    // }
    // next = ()=>{

    // }
}

export default Calendar;