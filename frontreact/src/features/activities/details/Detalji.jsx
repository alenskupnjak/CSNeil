import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';

function Detalji(props) {
	const { activity } = props;
	console.log('%c activity ', 'color:green', activity);

	return (
		<Card fluid>
			<Image src={`/assets/categoryImages/${activity.category}.jpg`} />
			<Card.Content>
				<Card.Header>{activity.title}</Card.Header>
				<Card.Meta>
					<span>{activity.date}</span>
				</Card.Meta>
				<Card.Description>{activity.description}</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<Button.Group widths="2">
					<Button basic color="blue" content="Edit" />
					<Button basic color="grey" content="Cancel" />
				</Button.Group>
			</Card.Content>
		</Card>
	);
}

export default Detalji;
