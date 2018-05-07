import React, { Component } from 'react';
import {Icon, TableHeaderCell, Table, Header, Segment, Modal } from 'semantic-ui-react';
import styled from 'styled-components';
import moment from 'moment';
import FormWorkout from '../FormWorkout'
import ModalWorkout from '../ModalWorkout'
import { monthUtil, padDate } from '../../utils/dateUtil'
const daysOfWeek = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];


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
    margin-left: 20%;
    margin-top: 5%;
    font-weight: bold;
    text-transform: uppercase;
`;

class Calendar extends Component {
    constructor(props){
        super(props);
        this.state={
            month: moment().month(),
            year: moment().year(), 
            open: false       
        }
    }

    open = () => this.setState({ open: true })
    close = () => this.setState({ open: false })

    previousMonth = ()=>{
        if(this.state.month === 0){
            this.setState({
                month: 11,
                year: this.state.year-1
            });
        } else {
            this.setState({
                month: this.state.month - 1,
                year: this.state.year
            });
        }
        console.log('this.state.month: ' + this.state.month);
    }
    
    nextMonth = ()=>{
        let month, year;
        if (this.state.month === 11){
            this.setState({
                month: 0,
                year: this.state.year + 1
            });
        }
        else{
            this.setState({
                month: this.state.month + 1,
                year: this.state.year
            });
        }
    }
    generateMonth(){
        let year = this.state.year,
            month = this.state.month,
            weeks = monthUtil(year, month)
         return(
             weeks.map(([week]) => {
                return (
                    <Table.Row>
                        {week.map((day) => {
                            return(
                                <Modal 
                                    trigger={<Table.Cell value={day}>
                                            {day}
                                            </Table.Cell>} 
                                    style={{marginTop: "10%", marginLeft: "10%", marginRight: "10%"}}>
                                    <Modal.Header>Log Workout</Modal.Header>
                                        <Modal.Content image>
                                        <Modal.Description>
                                            <Header></Header>
                                                <FormWorkout 
                                                    thisDay={padDate(day.toString())} 
                                                    thisMonth={padDate((this.state.month + 1).toString())} 
                                                    thisYear={this.state.year}/>
                                        </Modal.Description>
                                        </Modal.Content>
                                </Modal>
                            );
                        })}
                    </Table.Row>
                );
             })
         )
    }

    render(){
        return(
            <div>
                <HeaderWrapper>
                    <Header floated='left' style={HeaderArrow}>
                        <Icon name="arrow left" size="big" onClick={this.previousMonth}/>
                    </Header>
                    <Title>
                      {moment().clone().month(this.state.month).format("MMMM").toString()} {this.state.year}
                    </Title>
                    <Header floated='right' style={HeaderArrow}>
                     <Icon name="arrow right" size="big" onClick={this.nextMonth}/>
                    </Header>
                </HeaderWrapper>
                <Table celled unstackable>
                    <Table.Header>
                    <Table.Row>
                        {daysOfWeek.map((dayName)=>{
                            return <Table.HeaderCell>{dayName}</Table.HeaderCell>
                        })}
                    </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.generateMonth()}
                    </Table.Body>
                </Table>
            </div>
        );
    }
}

export default Calendar;