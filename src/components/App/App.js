import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
import CardStats from '../CardStats';
import CardUser from '../CardUser';
import NavBar from '../NavBar'
import runnerImage from './runner.jpg';


const Content = styled.div`
    height: 100%;
    background: url(${runnerImage});
    background-size: cover;
    background-attachment: fixed;
    background-repeat: no-repeat;
    overflow: hidden;
`;

class App extends Component {
  render() {
    return (
      <Content>
        <NavBar />
        <CardUser />
        <CardStats />
      </Content>
    );
  }
}

export default App;
