import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
let password = '',
    confirmPassword ='';


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
              onChange={this.handlePasswordChange}/><br/>
            <input
              type="password"
              name="signUpPasswordConfirm"
              placeholder="Confirm Password"
              value={this.state.signUpPasswordConfirm}
              onChange={this.handleConfirmPasswordChange}/><br/>  
            <input 
              type="submit" 
              value="Submit" 
              onClick={this.validateInput}/>
          </form> 
          <Link to="/login">Log In</Link>
      </div>
    );
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});   
  }
  handlePasswordChange = (event) => {
    this.handleChange(event);
    password = event.target.value;
  }
  handleConfirmPasswordChange = (event) => {
    this.handleChange(event);
    confirmPassword = event.target.value;
  }
  validateInput = (event) => {
    if(password !== confirmPassword){
      event.target.setCustomValidity('Passwords must match');
    } else {
      this.handleSubmit(event);
    }
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const { signUpEmail, signUpPassword} = this.state;
    console.log(JSON.stringify({
      signUpEmail,
      signUpPassword
    }));
    event.target.setCustomValidity('');
    fetch('/api/users/',{
      method: 'POST',
      body: JSON.stringify({
        signUpEmail,
        signUpPassword
      }),
      headers: {
        'Accept': 'application/json, */*',
        'Content': 'application/json'
      }
    }).then(response => response.json())
  }
}
export default App;