import React, { useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';

export default function DetaljForm(props) {
	const { closeForm, selektiran } = props;
	console.log('%c   props= ', 'color:green', props);

	let initialState = {
		id: '',
		title: '',
		category: '',
		description: '',
		date: '',
		city: '',
		venue: '',
	};

	if (selektiran) {
		initialState = selektiran;
	}

	const [stanje, setStanje] = useState(initialState);

	function handleSubmit() {
		console.log('%c 00 ', 'color:blue', stanje);
	}

	function handleInputChange(e) {
		console.log('%c e= ', 'color:green', e);
		const { name, value } = e.target;
		setStanje({ ...stanje, [name]: value });
	}

	return (
		<Segment clearing>
			<Form onSubmit={handleSubmit} autoComplete="off">
				<Form.Input placeholder="Title" value={stanje.title} name="title" onChange={handleInputChange} />
				<Form.TextArea placeholder="Opis" value={stanje.description} name="description" onChange={handleInputChange} />
				<Form.Input placeholder="Kategorija" value={stanje.culture} name="culture" onChange={handleInputChange} />
				<Form.Input placeholder="Date" value={stanje.date} name="date" onChange={handleInputChange} />
				<Form.Input placeholder="Grad" value={stanje.city} name="city" onChange={handleInputChange} />
				<Form.Input placeholder="Venue" value={stanje.venue} name="venue" onChange={handleInputChange} />
				<Button floated="right" positive type="submit" content="Submit" onClick={handleSubmit} />
				<Button floated="right" type="button" content="Cancel" onClick={closeForm} />
			</Form>
		</Segment>
	);
}
