import React, { Component } from 'react'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom'
import { Segment, Button, Divider, Form } from 'semantic-ui-react'

class LogIn extends Component {
    constructor(props){
      super(props);
      this.state = {
        logInEmail: '',
        logInPassword:'',
        authenticated: ''
      }
    }
    render() {
      if(this.state.authenticated === true){
        return <Redirect to='/dashboard' />
      } 
      return (
        <div>     
          <Segment padded width={8}>
            <Form>
              <Form.Field>
                <label>Email</label>
                <input
                  type="email"
                  name="logInEmail"
                  placeholder="Email"
                  value={this.state.logInEmail}
                  onChange={this.handleChange}/>
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input
                  type="password"
                  name="logInPassword"
                  placeholder="Password"
                  value={this.state.logInPassword}
                  onChange={this.handleChange}/>
              </Form.Field>
            </Form><br/>
            <Button secondary fluid
              type="submit" 
              value="Submit" 
              onClick={this.handleSubmit}>
              Log In
            </Button>
          </Segment>
        </div>
      );
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});   
    }
    handleSubmit = (event) => {
        const { logInEmail, logInPassword } = this.state;
        event.preventDefault();
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
          console.log(response);
          if(response.status === 200){
            this.handleSuccessfulLogin()
          } else {
            this.handleUnsuccessfulLogin()
          }
        })
        .catch(err => console.log('Error: ' + err))
        event.preventDefault();
    }
    handleSuccessfulLogin = () => {
      this.setState({ authenticated: true});
    }
    handleUnsuccessfulLogin = () => {
      this.setState({ authenticated: false});
      return window.alert('Incorrect username or password');
    }
}

export default LogIn;