import React, { Component } from 'react'
import { Search, Grid } from 'semantic-ui-react'

const API_KEY = '541ec4c0a5c05e8f0ca36040e19f72c583c923fe'

class SearchBar extends Component {
  render() {
    return (
      <Grid>
        <Grid.Column width={8}>
          <Search />
        </Grid.Column>
      </Grid>
    )
  }
}

export default SearchBar