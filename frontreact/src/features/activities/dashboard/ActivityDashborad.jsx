import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Grid } from 'semantic-ui-react';
import Detalji from '../details/Detalji';
import DetaljForm from '../form/DetaljForm';
import ActivityList from './ActivityList';
import { useStore } from '../../../app/stores/store';
import LoadingData from '../../../app/layout/LoadingData';

function ActivityDashboard(props) {
	const { activityStore } = useStore();
	const { selektiran, editMode } = activityStore;

	useEffect(() => {
		activityStore.loadActivities();
	}, [activityStore]);

	if (activityStore.loading) return <LoadingData content="Loading data..ddd.." />;

	return (
		<Grid>
			<Grid.Column width="10">
				<ActivityList />
			</Grid.Column>
			<Grid.Column width="6">
				<p>Filteri</p>
				{/* {selektiran && !editMode && <Detalji />}
				{editMode && <DetaljForm />} */}
			</Grid.Column>
		</Grid>
	);
}

export default observer(ActivityDashboard);
