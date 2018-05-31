import React from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const ButtonGroup = () => {
    return (
        <Button.Group>
            <Link to="/calendar/day">
                <Button>Day</Button>
            </Link>
            <Link to="/calendar/week">
                <Button>Week</Button>
            </Link>
            <Link to="/calendar">
                <Button>Month</Button>
            </Link>
        </Button.Group>
    )
}

export default ButtonGroup
