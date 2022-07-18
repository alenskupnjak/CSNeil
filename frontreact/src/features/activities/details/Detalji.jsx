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

function Detalji(props) {
	// ActivityDetails u videu
	const { activityStore } = useStore();
	// const { selektiran, openForm, cancelSelectedActivity } = activityStore;
	const { selektiran, loadActivity, loadingInitial } = activityStore;
	const { id } = useParams();

	useEffect(() => {
		if (id) loadActivity(id);
	}, [id, loadActivity]);

	if (loadingInitial || !selektiran) return <LoadingData content="Loading data..u Detaljima....." />;

	return (
		<Grid>
			<Grid.Column width={10}>
				<DetaljHeader selektiran={selektiran} />
				<DetaljInfo selektiran={selektiran} />
				<DetaljChat />
			</Grid.Column>
			<Grid.Column width={6}>
				<DetaljSideBar />
			</Grid.Column>
		</Grid>
	);

	// return (
	// 	<Card fluid>
	// 		<h1 style={{ color: 'red' }}>Detalji</h1>
	// 		<Image src={`/assets/categoryImages/${selektiran.category}.jpg`} />
	// 		<Card.Content>
	// 			<Card.Header>{selektiran.title}</Card.Header>

	// 			<Card.Meta>
	// 				<span>{selektiran.date}</span>
	// 			</Card.Meta>
	// 			<Card.Description>{selektiran.description}</Card.Description>
	// 		</Card.Content>
	// 		<Card.Content extra>
	// 			<Button.Group widths="2">
	// 				{/* <Button basic color="blue" content="Edit" onClick={() => openForm(selektiran.id)} /> */}
	// 				<Button as={Link} to={`/manage/${selektiran.id}`} basic color="blue" content="Edit" />
	// 				<Button as={Link} to={`/aktivni`} basic color="grey" content="Cancel" />
	// 				{/* <Button basic color="grey" content="Cancel" onClick={cancelSelectedActivity} /> */}
	// 			</Button.Group>
	// 		</Card.Content>
	// 	</Card>
	// );
}

export default observer(Detalji);
