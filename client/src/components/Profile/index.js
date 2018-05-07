import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'
import {Image, Video, Transformation, CloudinaryContext } from 'cloudinary-react';

class Profile extends Component {
    render(){
        return(
            <Form>
                <Button
                    onClick={this.handleImageUpload}>+</Button>
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
        function(error, result) { console.log(error, result) });
    }
}

export default Profile;