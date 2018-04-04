import React from 'react';
import { Card } from 'semantic-ui-react';

const items = [
  {
    header: 'Personal Records',
    description: 'Leverage agile frameworks to provide a robust synopsis for high level overviews.',
    meta: 'ROI: 30%',
  },
  {
    header: 'Workouts Logged',
    description: 'Bring to the table win-win survival strategies to ensure proactive domination.',
    meta: 'ROI: 34%',
  },
  {
    header: 'Days Active',
    description: 'Capitalise on low hanging fruit to identify a ballpark value added activity to beta test.',
    meta: 'ROI: 27%',
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