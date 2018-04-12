import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
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
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
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
              onChange={this.handlePasswordChange}/><br/>
            <input
              type="password"
              name="signUpPasswordConfirm"
              placeholder="Confirm Password"
              onChange={this.handleConfirmPasswordChange}/><br/>  
            <input 
              type="submit" 
              value="Submit" 
              onClick={this.validateInput}/>
          </form> 
      </div>
    );
  }

  handleChange(event){
    this.setState({[event.target.name]: event.target.value});
  }
  handleConfirmPasswordChange(event){
    confirmPassword = event.target.value;
  }
  handlePasswordChange(event){
    password = event.target.value;
  }
  validateInput(event){
    if(password !== confirmPassword){
      event.target.setCustomValidity('Passwords must match');
    } else {
      console.log(this.state.signUpPassword)
      this.handleSubmit(event);
    }
  }
  handleSubmit(event){
    const { signUpEmail, signUpPassword} = this.state;
    fetch('/api/users/' + signUpEmail + '/' + password,{
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
export default App;
