import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      signUpEmail: '',
      signUpPassword:'',
      signUpPasswordConfirm:''
    }
  }

  render() {
    return (
      <div>     
          Sign Up <br/>
          <form>
            <input
              type="email"
              name="signUpEmail"
              placeholder="Email"
              value={this.state.signUpEmail}
              onChange={this.handleChange}/><br/> 
             <input
              type="password"
              name="signUpPassword"
              placeholder="Password"
              value={this.state.signUpPassword}
              onChange={this.handleChange}/><br/>
            <input
              type="password"
              name="signUpPasswordConfirm"
              placeholder="Confirm Password"
              value={this.state.signUpPasswordConfirm}
              onChange={this.handleChange}/><br/>  
            <input 
              type="submit" 
              value="Submit" 
              onClick={this.handleSubmit}/>
          </form> 
          <Link to="/login">Log In</Link>
      </div>
    );
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = (event) => {
    const { signUpEmail, signUpPassword, signUpPasswordConfirm } = this.state;
    if(signUpPassword !== signUpPasswordConfirm){
      event.target.setCustomValidity('Passwords must match');
    } else {
      event.target.setCustomValidity('');
      fetch('/api/users/',{
        method: 'POST',
        body: JSON.stringify({
          signUpEmail,
          signUpPassword
        }),
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content': 'application/json'
        }
      }).then(response => response.json())
    }
  }
}
export default App;