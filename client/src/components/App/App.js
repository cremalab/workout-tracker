import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';

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
      </div>
    );
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = (event) => {
    console.log(this.state.signUpPassword);
    console.log(this.state.signUpPasswordConfirm);
    if(this.state.signUpPassword !== this.state.signUpPasswordConfirm){
      event.target.setCustomValidity('Passwords must match');
    } else {
      event.target.setCustomValidity('');
      const { signUpEmail, signUpPassword} = this.state;
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
