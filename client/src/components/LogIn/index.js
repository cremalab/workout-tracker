import React, { Component } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

class LogIn extends Component {
    constructor(props){
      super(props);
      this.state = {
        logInEmail: '',
        logInPassword:'',
        authenticated: false
      }
    }
    render() {
      if(this.state.authenticated === true){
        return <Redirect to='/dashboard' />
      }
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
        const { logInEmail, logInPassword } = this.state;
        fetch("/api/users/login",{
          method: 'POST',
          body: JSON.stringify({
            logInEmail,
            logInPassword
          }),
          headers: {
            'Accept': 'application/json, */*',
            'Content': 'application/json',
          }
        }).then(response => {
          response.json(); 
          console.log(response);
          if(response.status === 200){
            this.handleSuccessfulLogin()
          }
        })
        .catch(err => console.log('Error: ' + err))
        event.preventDefault();
    }
    handleSuccessfulLogin = () => {
      this.setState({ authenticated: true});
    }
}

export default LogIn;