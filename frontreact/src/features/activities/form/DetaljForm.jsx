import React from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';

export default function DetaljForm(props) {
	console.log('%c props= ', 'color:green', props);

	return (
		<Segment clearing>
			<Form>
				<Form.Input placeholder="Title" />
				<Form.TextArea placeholder="Opis" />
				<Form.Input placeholder="Kategorija" />
				<Form.Input placeholder="Date" />
				<Form.Input placeholder="Grad" />
				<Form.Input placeholder="Venue" />
				<Button floated="right" positive type="submit" content="Submit" />
				<Button floated="right" type="button" content="Cancel" />
			</Form>
		</Segment>
	);
}
