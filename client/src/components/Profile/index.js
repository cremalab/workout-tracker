import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'
import {Image, Video, Transformation, CloudinaryContext } from 'cloudinary-react';

class Profile extends Component {
    constructor(props){
        super(props);
        this.state ={
            profilePicId: "placeholder2"
        }
    }

    render(){
        return(
            <Form>
                <Form.Group>
                    <Image cloudName="workout-tracker" 
                            publicId={this.state.profilePicId} 
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
        console.log('image')
        window.cloudinary.openUploadWidget({ cloud_name: 'workout-tracker', upload_preset: 'engrhael'}, 
            (error, result) => { 
                console.log(error, result); 
                if (error) {
                    throw error
                } else if (result[0]){
                    this.setState({profilePicId: result[0].public_id})   
                } 
        });
        // fetch('/api/users/profile',{
        //     method: 'POST',
        //     body: JSON.stringify({
        //         result
        //     }),
        //     headers: {
        //     'Accept': 'application/json, text/plain, */*',
        //     'Content': 'application/json'
        //     }
        // }).then(response => response.json()) 
    }
}

export default Profile;