import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { Image, Video, Transformation, CloudinaryContext } from 'cloudinary-react';
import { connect } from 'react-redux'
import { updateUser } from '../../state/actions/updateUser'
import { bindActionCreators } from 'redux'
import _ from 'lodash'

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            profilePicId: '',
            firstName: '',
            lastName: '',
            bio: '',
            age: '',
            weight: '',
            goalWeight: '',
            gender: '',
            DOB: ''
        }
    }

    componentWillMount(){
        //If user "logged in" (right now just checking Redux state), 
        //get profile pic from db and update redux state
        if(this.props.user.email){
            //Retrieve profilePic
            let url = '/api/users/profilePic/' + this.props.user.email
            fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content': 'application/json'
                }
            }).then(response => {
                return response.json()
            }).then(data => {
                this.setState({ profilePicId: data.profilePicId })
            })

            //Retrieve profile data
            let url2 = '/api/users/profile/' + this.props.user.email
            fetch(url2, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content': 'application/json'
                }
            }).then(response => {
                return response.json()
            }).then(data => {
                this.setState({
                    profilePicId: data.profilePicId,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    bio: data.bio,
                    age: data.age,
                    weight: data.weight,
                    goalWeight: data.goalWeight,
                    gender: data.gender,
                    DOB: data.DOB
                })
            })
        }
    }

    render(){
        const hasProfilePic = this.state.firstName
        const deleteProfilePic = hasProfilePic ? (<p>Delete Picture</p>) : (<p>hi</p>);
        return(
            <Form>
                <Form.Group>
                    <Image cloudName='workout-tracker' 
                            publicId={this.state.profilePicId || 'placeholder2'} 
                            width='100' crop='scale' 
                            onClick={this.handleImageUpload}
                            style={{cursor : 'pointer'}}/>
                    {deleteProfilePic}
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Field>
                    <label>First Name</label>
                    <input 
                        name='firstName'
                        placeholder={this.state.firstName || 'First Name'}
                        value={this.state.firstName}
                        onChange={this.handleChange} />
                    </Form.Field>
                    <Form.Field>
                    <label>Last Name</label>
                    <input 
                        name='lastName'
                        placeholder={this.state.lastName || 'Last Name'}
                        value={this.state.lastName}
                        onChange={this.handleChange} />
                    </Form.Field>
                </Form.Group>
                <Form.Field>
                <label>Bio</label>
                <input 
                    name='bio'
                    placeholder={this.state.bio || 'Bio'}
                    value={this.state.bio}
                    onChange={this.handleChange} />
                </Form.Field>
                <Form.Group widths='equal'>
                    <Form.Field>
                    <label>Age</label>
                    <input 
                        name='age'
                        placeholder={this.state.age || 'Age'}
                        value={this.state.age}
                        onChange={this.handleChange} />
                    </Form.Field>
                    <Form.Field>
                    <label>Weight</label>
                    <input 
                        name='weight'
                        placeholder={this.state.weight || 'Weight'}
                        value={this.state.weight}
                        onChange={this.handleChange} />
                    </Form.Field>
                    <Form.Field>
                    <label>Goal Weight</label>
                    <input 
                        name='goalWeight'
                        placeholder={this.state.goalWeight || 'Goal Weight'}
                        value={this.state.goalWeight}
                        onChange={this.handleChange} />
                    </Form.Field>
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Field>
                    <label>Gender</label>
                    <input 
                        name='gender'
                        placeholder={this.state.gender ||'Gender'}
                        value={this.state.gender}
                        onChange={this.handleChange} />
                    </Form.Field>
                    <Form.Field>
                    <label>Date Of Birth</label>
                    <input 
                        type='date'
                        name='DOB'
                        placeholder={this.state.DOB || 'Date of Birth'}
                        value={this.state.DOB}
                        onChange={this.handleChange} />
                    </Form.Field>
                </Form.Group>
                <Button type='submit' onClick={this.handleSubmit}>Save</Button>
            </Form>
        )
    }

    handleImageUpload= () => {
        window.cloudinary.openUploadWidget({ cloud_name: 'workout-tracker', upload_preset: 'engrhael'}, 
            (error, result) => { 
                if (error) {
                    throw error
                } else if (result[0]){
                    //update redux state with user profile pic - does this need to be stored in redux? 
                    //could pull from DB instead but GET request only in componentWillMount right now  
                    //this.props.updateUser(this.props.user.email, result[0].public_id)
                    this.setState({ profilePicId: result[0].public_id })
                    //send email from redux state so that user can be found in db
                    fetch('/api/users/profilePic',{
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

    handleChange = (event) =>{
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit=(event)=>{
        const { profilePicId, firstName, lastName, bio, age, weight, goalWeight, gender, DOB } = this.state
        fetch('/api/users/profile',{
            method: 'POST',
            body: JSON.stringify({
                user: this.props.user,
                profilePicId,
                firstName, 
                lastName, 
                bio, 
                age, 
                weight, 
                goalWeight, 
                gender, 
                DOB
            }),
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content': 'application/json'
            }
          }).then(response => response.json())
    }
}

const mapStateToProps = (state) =>{
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { updateUser })(Profile);