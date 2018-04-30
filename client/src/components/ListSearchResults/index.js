import React from 'react'
import ListItemSearchResult from '../ListItemSearchResult'
import { Table, Icon } from 'semantic-ui-react'

const ListSearchResults = (props) => {
    const workoutItems = props.workouts.map((workout) => {
        return <ListItemSearchResult key={workout.key} workout={workout} />
    });

    return (
        <Table basic='very'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Movement</Table.HeaderCell>
            <Table.HeaderCell>{props.workouts.length}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
    
        <Table.Body>
            {workoutItems}   
        </Table.Body>
      </Table>
    )
}
  
  export default ListSearchResults