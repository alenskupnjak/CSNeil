import React from 'react';
import { Grid } from 'semantic-ui-react';
import Detalji from '../details/Detalji';
import DetaljForm from '../form/DetaljForm';
import ActivityList from './ActivityList';

export default function ActivityDashboard(props) {
	const { activities, selektiran, selectActivity, canceledSelectActivity } = props;
	console.log('%c ActivityDashboard = ', 'color:green', activities);

	return (
		<Grid>
			<Grid.Column width="10">
				<ActivityList activities={activities} selectActivity={selectActivity} />
			</Grid.Column>
			<Grid.Column width="6">
				{selektiran && <Detalji activity={selektiran} canceledSelectActivity={canceledSelectActivity} />}
				<DetaljForm />
			</Grid.Column>
		</Grid>
	);
}
