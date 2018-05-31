import React, { Component } from 'react'
import styled from 'styled-components'
import { Table, Header, Icon } from 'semantic-ui-react'
import ButtonGroup from '../ButtonGroup'

const CalendarHeader = ({ previousWeek, nextWeek }) => {
    return (
        <div>
            <ButtonGroup />
            <HeaderWrapper>
                <Header floated='left' style={HeaderArrow}>
                    <Icon name="arrow left" size="big" onClick={previousWeek}/>
                </Header>
                <Header floated='right' style={HeaderArrow}>
                    <Icon name="arrow right" size="big" onClick={nextWeek}/>
                </Header>
            </HeaderWrapper>
        </div>
    );
}

const HeaderWrapper = styled.div`
    height: 80px;
    width: 95%;
    margin: 3%;
    overflow: hidden;
`;

const HeaderArrow = {
    color: "#FA8072", 
    paddingTop: "5%"
};

export default CalendarHeader;