import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
import CardStats from '../CardStats';
import CardUser from '../CardUser';
import NavBar from '../NavBar';


class App extends Component {
  render() {
    return (
      <div>     
          <CardUser />
          <CardStats />
      </div>
    );
  }
}

export default App;
