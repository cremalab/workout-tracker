import React from 'react';
import { Card } from 'semantic-ui-react';

const items = [
  {
    header: 'Personal Records',
    description: '300 lb',
    meta: 'Squat',
  },
  {
    header: 'Workouts Logged',
    description: '37',
    meta: 'This Year',
  },
  {
    header: 'Days Active',
    description: '9',
    meta: 'This Month',
  },
]

const CardStatItem =()=>{
	return(
		<div>
			<Card.Group items={items} />
		</div>
	);
}

export default CardStatItem;