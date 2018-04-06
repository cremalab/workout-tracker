import React, { Component } from 'react';
import {Icon, TableHeaderCell, Table } from 'semantic-ui-react';
import Moment from 'moment';

class Calendar extends Component {
    constructor(props){
        super(props);
        this.state={
            // startDate: moment(Moment()),
            // month: moment(Moment().month().toString())
        }
    }
    
    previous = ()=>{
        this.setState({month: Moment().subtract(1,"month").format("MM")});
        console.log(this.state.month);
    }
    next = ()=>{

    }

    render(){
        let days =["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
        return(
            <div>
                <Icon name="arrow left"  />
                <Table celled inverted>
                    <Table.Header>
                    <Table.Row>
                    {days.map((day)=>{
                        return <Table.HeaderCell >{day}</Table.HeaderCell >
                    })}
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                    <Table.Row>
                        <Table.Cell onClick={this.previous}>{this.state.month}</Table.Cell>
                        <Table.Cell>{Moment().date()}</Table.Cell>
                        <Table.Cell>{Moment().day()}</Table.Cell>
                        <Table.Cell></Table.Cell>
                        <Table.Cell></Table.Cell>
                        <Table.Cell></Table.Cell>
                        <Table.Cell></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                    <Table.Cell></Table.Cell>
                        <Table.Cell></Table.Cell>
                        <Table.Cell></Table.Cell>
                        <Table.Cell></Table.Cell>
                        <Table.Cell></Table.Cell>
                        <Table.Cell></Table.Cell>
                        <Table.Cell></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                    <Table.Cell></Table.Cell>
                        <Table.Cell></Table.Cell>
                        <Table.Cell></Table.Cell>
                        <Table.Cell></Table.Cell>
                        <Table.Cell></Table.Cell>
                        <Table.Cell></Table.Cell>
                        <Table.Cell></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                    <Table.Cell></Table.Cell>
                        <Table.Cell></Table.Cell>
                        <Table.Cell></Table.Cell>
                        <Table.Cell></Table.Cell>
                        <Table.Cell></Table.Cell>
                        <Table.Cell></Table.Cell>
                        <Table.Cell></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                    <Table.Cell></Table.Cell>
                        <Table.Cell></Table.Cell>
                        <Table.Cell></Table.Cell>
                        <Table.Cell></Table.Cell>
                        <Table.Cell></Table.Cell>
                        <Table.Cell></Table.Cell>
                        <Table.Cell></Table.Cell>
                    </Table.Row>
                    </Table.Body>
                </Table>
            </div>
        );
    }
}

export default Calendar;