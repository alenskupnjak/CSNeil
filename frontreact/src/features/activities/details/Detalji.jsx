import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

function Detalji(props) {
	const { activityStore } = useStore();
	const { selektiran, openForm, cancelSelectedActivity } = activityStore;

	return (
		<Card fluid>
			<Image src={`/assets/categoryImages/${selektiran.category}.jpg`} />
			<Card.Content>
				<Card.Header>{selektiran.title}</Card.Header>
				<Card.Meta>
					<span>{selektiran.date}</span>
				</Card.Meta>
				<Card.Description>{selektiran.description}</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<Button.Group widths="2">
					<Button basic color="blue" content="Edit" onClick={() => openForm(selektiran.id)} />
					<Button basic color="grey" content="Cancel" onClick={cancelSelectedActivity} />
				</Button.Group>
			</Card.Content>
		</Card>
	);
}

export default Detalji;
