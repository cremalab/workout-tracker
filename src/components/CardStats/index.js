import React from 'react';
import CardStatsItem from '../CardStatsItem';
import styled from 'styled-components';

const Content = styled.div`
	height: 100%;
	float: right;
	margin: 20px;
`;

const CardStats = ()=>{
	return(
		<Content>
			<CardStatsItem />
		</Content>
	);
}

export default CardStats;