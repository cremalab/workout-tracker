import React from 'react'
import ListItemSearchResult from '../ListItemSearchResult'
import { Table, Icon } from 'semantic-ui-react'

const ListSearchResults = (props) => {
    // const resultItems = props.results.map((result) => {
    //     return <ResultListItem result={result} />
    // });

    return (
        <Table basic='very'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Movement</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
    
        <Table.Body>
          <Table.Row>
            <Table.Cell>Kettlebell Swing</Table.Cell>
            <Table.Cell><Icon name="plus" /></Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Run</Table.Cell>
            <Table.Cell><Icon name="plus" /></Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Back Squat</Table.Cell>
            <Table.Cell><Icon name="plus" /></Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    )
}
  
  export default ListSearchResults