import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';
import { Segment, Button, Divider, Form } from 'semantic-ui-react'

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
          {/* Sign Up <br/>
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
          </form>  */}
          <Segment padded width={8}>
            <Form>
              <Form.Field>
                <label>Email</label>
                <input
                  type="email"
                  name="signUpEmail"
                  placeholder="Email"
                  value={this.state.signUpEmail}
                  onChange={this.handleChange}/>
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input
                  type="password"
                  name="signUpPassword"
                  placeholder="Password"
                  value={this.state.signUpPassword}
                  onChange={this.handleChange}/>
              </Form.Field>
              <Form.Field>
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="signUpPasswordConfirm"
                  placeholder="Confirm Password"
                  value={this.state.signUpPasswordConfirm}
                  onChange={this.handleChange}/>
              </Form.Field>
            </Form><br/>
            <Button primary fluid 
              type="submit" 
              value="Submit" 
              onClick={this.handleSubmit}>
              Sign Up Now
            </Button>
            <Divider horizontal>Or</Divider>
            <Button secondary fluid><Link to="/login">Log In</Link></Button>
          </Segment>
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