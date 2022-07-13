import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

// function DetaljForm(props) {
// const { createOrEditActivity, snimanje } = props;
function DetaljForm() {
	const { activityStore } = useStore();
	const { selektiran, closeForm, createActivity, updateActivity, loading } = activityStore;

	let initialState = {
		id: null,
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

	function handleSubmit(e) {
		e.preventDefault();
		console.log('%c stanje =', 'color:gold', stanje);
		stanje.id ? updateActivity(stanje) : createActivity(stanje);
		// createOrEditActivity(stanje);
	}

	function handleInputChange(e) {
		const { name, value } = e.target;
		setStanje({ ...stanje, [name]: value });
	}

	return (
		<Segment clearing>
			<Form onSubmit={handleSubmit} autoComplete="off">
				<Form.Input placeholder="Title" value={stanje.title} name="title" onChange={handleInputChange} />
				<Form.TextArea placeholder="Opis" value={stanje.description} name="description" onChange={handleInputChange} />
				<Form.Input placeholder="Kategorija" value={stanje.category} name="category" onChange={handleInputChange} />
				<Form.Input placeholder="Date" type="date" value={stanje.date} name="date" onChange={handleInputChange} />
				<Form.Input placeholder="Grad" value={stanje.city} name="city" onChange={handleInputChange} />
				<Form.Input placeholder="Venue" value={stanje.venue} name="venue" onChange={handleInputChange} />
				<Button loading={loading} floated="right" positive type="submit" content="Submit" />
				<Button floated="right" type="button" content="Cancel" onClick={closeForm} />
			</Form>
		</Segment>
	);
}

export default observer(DetaljForm);
