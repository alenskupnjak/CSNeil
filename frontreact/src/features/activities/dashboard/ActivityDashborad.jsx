import React from 'react';
import { Grid } from 'semantic-ui-react';
import Detalji from '../details/Detalji';
import DetaljForm from '../form/DetaljForm';
import ActivityList from './ActivityList';

export default function ActivityDashboard(props) {
	const {
		activities,
		selektiran,
		selectActivity,
		canceledSelectActivity,
		editMode,
		openForm,
		closeForm,
		createOrEditActivity,
		deleteActivity,
		snimanje,
	} = props;

	return (
		<Grid>
			<Grid.Column width="10">
				<ActivityList
					activities={activities}
					selectActivity={selectActivity}
					deleteActivity={deleteActivity}
					snimanje={snimanje}
				/>
			</Grid.Column>
			<Grid.Column width="6">
				{selektiran && !editMode && (
					<Detalji activity={selektiran} canceledSelectActivity={canceledSelectActivity} openForm={openForm} />
				)}
				{editMode && (
					<DetaljForm
						closeForm={closeForm}
						selektiran={selektiran}
						createOrEditActivity={createOrEditActivity}
						snimanje={snimanje}
					/>
				)}
			</Grid.Column>
		</Grid>
	);
}
