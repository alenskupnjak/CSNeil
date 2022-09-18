import React from 'react';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Grid, Image } from 'semantic-ui-react';
import LoadingData from '../../../app/layout/LoadingData';
import { useStore } from '../../../app/stores/store';
import DetaljHeader from './DetaljiHeader';
import DetaljInfo from './DetaljInfo';
import DetaljChat from './DetaljChat';
import DetaljSideBar from './DetaljSideBar';

// ActivityDetails u videu
function Detalji(props) {
	const { activityStore } = useStore();
	// const { selektiran, openForm, cancelSelectedActivity } = activityStore;
	const { selektiran, loadActivity, loadingInitial, clearSelectedActivity } = activityStore;
	const { id } = useParams();

	useEffect(() => {
		if (id) loadActivity(id);
		return () => clearSelectedActivity();
	}, [id, loadActivity]);

	if (loadingInitial || !selektiran) return <LoadingData content="Loading data..u Detaljima....." />;

	return (
		<Grid>
			<Grid.Column width={10}>
				<DetaljHeader selektiran={selektiran} />
				<DetaljInfo selektiran={selektiran} />
				<DetaljChat activityId={selektiran.id} />
			</Grid.Column>
			<Grid.Column width={6}>
				<DetaljSideBar selektiran={selektiran} />
			</Grid.Column>
		</Grid>
	);
}

export default observer(Detalji);
