import React, { Component } from 'react'
import ButtonGroup from '../ButtonGroup'
import { Table, Header } from 'semantic-ui-react'
import { weekUtil, daysOfWeek } from '../../utils/dateUtil'

class CalendarWeek extends Component {
    render() {
        return (
            <div>
                <ButtonGroup />
                <Table celled unstackable>
                    <Table.Header>
                        <Table.Row>
                          {daysOfWeek.map((day) => {
                              return <Table.HeaderCell>{day}</Table.HeaderCell>
                          })}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>
                                one
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>
        );
    }
}

export default CalendarWeek;
