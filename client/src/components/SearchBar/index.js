import React, { Component } from 'react'
import { Search, Grid } from 'semantic-ui-react'

class SearchBar extends Component {
  constructor(props){
    super(props)
    this.state = {
      term: ''
    }
  }
  render() {
    return (
      <Grid>
        <Grid.Column>
          <input 
            value={this.state.term}
            onChange={event => this.handleInputChange(event)}/>
        </Grid.Column>
      </Grid>
    )
  }

  handleInputChange(event){
    this.setState({term: event.target.value})
    console.log(this.state.term)
  }
}

export default SearchBar