import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Grid } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import { useStore } from '../../../app/stores/store';
import LoadingData from '../../../app/layout/LoadingData';
import ActivityFilters from './ActivityFilters';

function ActivityDashboard(props) {
	const { activityStore, userStore } = useStore();

	useEffect(() => {
		if (userStore.isLoggedIn) {
			activityStore.loadActivities();
		}
	}, [activityStore]);

	if (activityStore.loading) return <LoadingData content="Loading data list...." />;

	return (
		<Grid>
			<Grid.Column width="10">
				<ActivityList />
			</Grid.Column>
			<Grid.Column width="6">
				<ActivityFilters />
			</Grid.Column>
		</Grid>
	);
}

export default observer(ActivityDashboard);
