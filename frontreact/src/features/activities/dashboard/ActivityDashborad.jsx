import React from 'react';
import { observer } from 'mobx-react-lite';
import { Grid } from 'semantic-ui-react';
import Detalji from '../details/Detalji';
import DetaljForm from '../form/DetaljForm';
import ActivityList from './ActivityList';
import { useStore } from '../../../app/stores/store';

function ActivityDashboard(props) {
	// const { createOrEditActivity, deleteActivity, snimanje } = props;
	// const { deleteActivity, snimanje } = props;

	const { activityStore } = useStore();
	const { selektiran, editMode } = activityStore;

	return (
		<Grid>
			<Grid.Column width="10">
				<ActivityList
				// activities={activities}
				// selectActivity={selectActivity}
				// deleteActivity={deleteActivity}
				// snimanje={snimanje}
				/>
			</Grid.Column>
			<Grid.Column width="6">
				{selektiran && !editMode && <Detalji />}
				{/* {editMode && <DetaljForm createOrEditActivity={createOrEditActivity} snimanje={snimanje} />} */}
				{editMode && <DetaljForm />}
			</Grid.Column>
		</Grid>
	);
}

export default observer(ActivityDashboard);
