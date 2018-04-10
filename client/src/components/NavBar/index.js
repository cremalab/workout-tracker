import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import { Menu, Input } from 'semantic-ui-react'

class NavBar extends Component {
 state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
        <Menu pointing>
          <Link to="/"><Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} /></Link>
          <Link to="/calendar"><Menu.Item name='calendar' active={activeItem === 'calendar'} onClick={this.handleItemClick} /></Link>
          <Link to="/goals"><Menu.Item name='goals' active={activeItem === 'goals'} onClick={this.handleItemClick} /></Link>
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input icon='search' placeholder='Search...' />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
    )
  }
}

export default NavBar;