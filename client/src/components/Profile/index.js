import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'
import {Image, Video, Transformation, CloudinaryContext } from 'cloudinary-react';
import { connect } from 'react-redux'
import { updateUser } from '../../state/actions/updateUser'
import { bindActionCreators } from 'redux'

class Profile extends Component {
    constructor(props){
        super(props);
        this.state ={
            profilePicId: "placeholder2"
        }
    }

    componentDidMount(){
        // this.props.dispatch({
        //     type: types.PROFILE__REQUESTED,
        //     payload: {
        //       userId: this.props.pageState.auth.id
        //     }
        // });
        //send user id as paylod, get profilePicId back
        let url = '/api/users/profile/' + this.props.user.email
        fetch(url, {
            method: 'GET',
            data: {
                user: this.props.user
            },
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content': 'application/json'
            }
        }).then(response => {
            //console.log(response)
            return response.json()
            //console.log(this.props.user)
        }).then(data => {
            console.log(data)
            this.setState({profilePicId: data.profilePicId })
        })
        
        //this.setState({profilePicId: })
    }

    render(){
        return(
            <Form>
                <Form.Group>
                    <Image cloudName="workout-tracker" 
                    // user.profilepicid ||
                            publicId={ this.state.profilePicId} 
                            width="100" crop="scale" 
                            onClick={this.handleImageUpload}
                            style={{cursor : "pointer"}}/>
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Field>
                    <label>First Name</label>
                    <input placeholder='First Name' />
                    </Form.Field>
                    <Form.Field>
                    <label>Last Name</label>
                    <input placeholder='Last Name' />
                    </Form.Field>
                </Form.Group>
                <Form.Field>
                <label>Bio</label>
                <input placeholder='Bio' />
                </Form.Field>
                <Form.Group widths='equal'>
                    <Form.Field>
                    <label>Age</label>
                    <input placeholder='Age' />
                    </Form.Field>
                    <Form.Field>
                    <label>Weight</label>
                    <input placeholder='Weight' />
                    </Form.Field>
                    <Form.Field>
                    <label>Goal Weight</label>
                    <input placeholder='Goal Weight' />
                    </Form.Field>
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Field>
                    <label>Gender</label>
                    <input placeholder='Gender' />
                    </Form.Field>
                    <Form.Field>
                    <label>Date Of Birth</label>
                    <input placeholder='DOB' />
                    </Form.Field>
                </Form.Group>
                <Button type='submit'>Save</Button>

            </Form>
        )
    }

    handleImageUpload= () => {
        window.cloudinary.openUploadWidget({ cloud_name: 'workout-tracker', upload_preset: 'engrhael'}, 
            (error, result) => { 
                if (error) {
                    throw error
                } else if (result[0]){
                    this.setState({profilePicId: result[0].public_id})
                    //update redux state with user profile pic - does this need to be stored in redux? 
                    //could pull from DB instead   
                    this.props.updateUser(this.props.user.email, result[0].public_id)
                    //needs to send user email so mongo knows which record to update. Get this from redux state?
                    //get email from redux state?
                    fetch('/api/users/profile',{
                        method: 'POST',
                        body: JSON.stringify({
                            user: this.props.user,
                            result
                        }),
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content': 'application/json'
                        }
                    }).then(response => {response.json()}) 
                } 
        });
        
    }
}

const mapStateToProps = (state) =>{
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { updateUser })(Profile);