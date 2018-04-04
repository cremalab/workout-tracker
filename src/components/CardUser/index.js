import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import styled from 'styled-components';

const Content = styled.div`
	float: left;
	margin: 20px;
 `;

const CardUser = ()=>{
	return(
		<Content>
		<Card>
		    <Image src={require('./me.jpg')} />
		    <Card.Content>
		      <Card.Header>
		        Mandy
		      </Card.Header>
		      <Card.Meta>
		        <span className='date'>
		          Joined in 2017
		        </span>
		      </Card.Meta>
		    </Card.Content>
		    <Card.Content extra>
		      <a>
		        <Icon name='user' />
		        22 Friends
		      </a>
		    </Card.Content>
		 </Card>
		 </Content>
	);
}

export default CardUser;