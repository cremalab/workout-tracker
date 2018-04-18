import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

class LogIn extends Component {
    constructor(props){
      super(props);
      this.state = {
        logInEmail: '',
        logInPassword:'',
      }
    }
  
    render() {
      return (
        <div>     
            Log In <br/>
            <form>
              <input
                type="email"
                name="logInEmail"
                placeholder="Email"
                value={this.state.logInEmail}
                onChange={this.handleChange}/><br/> 
               <input
                type="password"
                name="logInPassword"
                placeholder="Password"
                value={this.state.logInPassword}
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
        event.preventDefault();
        const { logInEmail, logInPassword } = this.state;
        fetch("/api/users/login",{
          method: 'POST',
          body: JSON.stringify({
            logInEmail,
            logInPassword
          }),
          headers: {
            "Accept": "application/json, */*",
            "Content": "application/json",
            "Cookie": "secret32characterpassword"
          }
        }).then(response => response.json())
        .catch(err => console.log('Error: ' + err))
        .then(response => console.log('Response: ' + response));
      }
}

export default LogIn;