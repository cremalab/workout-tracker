import React, { Component } from 'react';
import { connect } from 'react-redux';

class AuthContainer extends Component {
    render(){
        return (
            <div>auth container</div>
        );
    }
}

const mapStateToProps = (state) =>({
    auth: state.auth
});

export default connect(mapStateToProps)(AuthContainer);