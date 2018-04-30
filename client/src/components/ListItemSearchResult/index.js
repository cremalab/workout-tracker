import React from 'react'
import { Table, Icon } from 'semantic-ui-react'

const ListItemSearchResult = ({workout}) => {
    return (
        <Table.Row>
            <Table.Cell>{workout.name}</Table.Cell>
            <Table.Cell><Icon name="plus" /></Table.Cell>
        </Table.Row>
    );
  }
  
  export default ListItemSearchResult