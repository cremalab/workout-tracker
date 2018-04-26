import React from 'react'
import { Button, Header, Image, Modal, Checkbox, Form, Input, Radio, Select, TextArea } from 'semantic-ui-react'
import styled from 'styled-components'
import WorkoutForm from '../WorkoutForm'

const WorkoutModal = () => (
    
    <Modal trigger={<Button>+</Button>} style={{marginTop: "10%", marginLeft: "10%", marginRight: "10%"}}>
        <Modal.Header>Log Workout</Modal.Header>
        <Modal.Content image>
        <Modal.Description>
            <Header></Header>
                <WorkoutForm />
        </Modal.Description>
        </Modal.Content>
    </Modal>
  
)

export default WorkoutModal