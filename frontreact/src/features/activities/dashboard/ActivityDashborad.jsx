import React from 'react';
import { Grid } from 'semantic-ui-react';
import Detalji from '../details/Detalji';
import DetaljForm from '../form/DetaljForm';
import ActivityList from './ActivityList';

export default function ActivityDashboard({ activities }) {
	console.log('%c ActivityDashboard = ', 'color:green', activities);

	return (
		<Grid>
			<Grid.Column width="10">
				<ActivityList activities={activities} />
			</Grid.Column>
			<Grid.Column width="6">{activities[0] && <Detalji activity={activities[0]} />}
      <DetaljForm />
      </Grid.Column>
		</Grid>
	);
}
