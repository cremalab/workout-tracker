import React, { Component } from 'react'
import { weekDateArray } from '../../utils/dateUtil'
import { Table, Header } from 'semantic-ui-react'

const CalendarTableHeader = ({ startDate }) => {
    return (
        <Table.Header>
            <Table.Row>
                {renderHeaderRow(startDate)}
            </Table.Row>
        </Table.Header>
    );
}

const renderHeaderRow = (startDate) =>{
    return (
        weekDateArray(startDate).map((day) =>{
            return <Table.HeaderCell>{day.format("ddd DD")}</Table.HeaderCell>
        })
    )
}

export default CalendarTableHeader;