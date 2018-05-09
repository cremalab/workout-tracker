import React, { Component } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { updateUser } from '../../state/actions/updateUser'
import { bindActionCreators } from 'redux'

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
      this.props.updateUser(this.state.logInEmail, null)
    }
    handleUnsuccessfulLogin = () => {
      this.setState({ authenticated: false});
      return window.alert('Incorrect username or password');
    }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, {updateUser})(LogIn);