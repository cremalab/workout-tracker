import React from 'react'
import ResultListItem from '../ResultListItem'
import { Table, Icon } from 'semantic-ui-react'

const ResultList = (props) => {
    // const resultItems = props.results.map((result) => {
    //     return <ResultListItem result={result} />
    // });

    return (
        <Table basic='very'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Movement</Table.HeaderCell>
            <Table.HeaderCell>Add</Table.HeaderCell>
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
  
  export default ResultList;