import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
import NavBar from '../NavBar';


class App extends Component {
  render() {
    return (
      <div>     
          Sign Up <br/>
          <input
              type="text"
              placeholder="First Name"/><br/> 
          <input type="submit" value="Submit" />
      </div>
    );
  }
}

export default App;
