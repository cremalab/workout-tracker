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
            year = 2018,
            month = 3,
            startDate = moment([year, month]),
            firstOfMonth = moment(startDate).clone().startOf('month'),
            firstOfMonthDate = firstOfMonth.date(),
            firstOfMonthDay = firstOfMonth.day(),
            lastOfMonth = moment(startDate).clone().endOf('month'),
            lastOfMonthDate = lastOfMonth.date(),
            currentWeek = firstOfMonth.clone().day(0),
            currentDay = currentWeek.format('DD'),
            daysInMonth = moment([year, month]).daysInMonth(),
            //monthRange = moment.range(firstOfMonth, lastOfMonth),
            weeks = [];

        var week = [],
            x=0;
        {
            while ( x < 1){
                //add blank days to first week
                //use currentWeek here then increment it at the end? http://jsfiddle.net/timrwood/XEqBE/
                if(currentDay === '01'){ //only loop here if 1st of month is in that week
                    for(var i = 0; i < firstOfMonthDay; i++){
                        var blank = '';
                        week.push(blank);
                    }
                }
                //add rest of days after blanks
                var daysToAdd = 7 - week.length;
                for(var i = 1; i <= daysToAdd; i++){
                    week.push(i);
                }
                //for(var j= 0; j < 3; j++){
                    weeks.push(week);     
               // }
             x++;
            }
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
                    <Table.Row>
                        <Table.Cell>{this.state.startOfMonth}</Table.Cell>
                        <Table.Cell>{this.state.endOfMonth}</Table.Cell>
                        <Table.Cell>{moment().week()}</Table.Cell>
                        <Table.Cell>{firstOfMonthDay.toString()}</Table.Cell>
                        <Table.Cell>{moment().startOf('week').format("DD").toString()}</Table.Cell>
                        <Table.Cell>{daysInMonth.toString()}</Table.Cell>
                        <Table.Cell>{currentWeek.toString()}</Table.Cell>
                    </Table.Row>
                    {weeks.map((subweek) => {
                        return (
                            <Table.Row>
                                {week.map((day) => {
                                    return (
                                        <Table.Cell>{day}</Table.Cell>
                                    )
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