import React, { Component } from 'react'
import { Button, Header, Modal } from 'semantic-ui-react'
import styled from 'styled-components'
import FormWorkout from '../FormWorkout'

class ModalWorkout extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
    }

    open = () => this.setState({ open: true })
    close = () => this.setState({ open: false })
    
    render(){
        const { open } = this.state
        let trigger = this.props.trigger || <Button>+</Button>
        return(
            <Modal 
                trigger={trigger} 
                style={{marginTop: "10%", marginLeft: "10%", marginRight: "10%"}}
                open={open}
                onOpen={this.open}
                onClose={this.close}>
                <Modal.Header>Log Workout</Modal.Header>
                <Modal.Content image>
                    <Modal.Description>
                        <Header></Header>
                            <FormWorkout 
                                handleClose={this.close}
                                thisDay={this.props.thisDay} 
                                thisMonth={this.props.thisMonth} 
                                thisYear={this.props.thisYear}/>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
}

export default ModalWorkout