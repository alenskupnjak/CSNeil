import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { Link, useHistory, useParams } from 'react-router-dom';
import LoadingData from '../../../app/layout/LoadingData';

// function DetaljForm(props) {
// const { createOrEditActivity, snimanje } = props;
function DetaljForm() {
	const { activityStore } = useStore();
	const { selektiran, createActivity, updateActivity, loading, loadActivity, loadingInitial } = activityStore;
	const { id } = useParams();
	const history = useHistory();

	const [stanje, setStanje] = useState({
		id: null,
		title: '',
		category: '',
		description: '',
		date: '',
		city: '',
		venue: '',
	});

	useEffect(() => {
		if (id) {
			loadActivity(id);
			selektiran && setStanje(selektiran);
		}
	}, [id, loadActivity, selektiran]);

	// submit
	function handleSubmit(e) {
		e.preventDefault();
		if (stanje.id) {
			updateActivity(stanje);
			history.push(`/aktivni/${stanje.id}`);
		} else {
			createActivity(stanje);
			history.push(`/aktivni`);
		}
	}

	function handleInputChange(e) {
		const { name, value } = e.target;
		setStanje({ ...stanje, [name]: value });
	}

	if (loadingInitial) return <LoadingData content="Loading data..u DetaljFORM   005 ....." />;

	return (
		<Segment clearing>
			<Form onSubmit={handleSubmit} autoComplete="off">
				<h1 style={{ color: 'red' }}>DetaljiFORM</h1>
				<Form.Input placeholder="Title" value={stanje.title} name="title" onChange={handleInputChange} />
				<Form.TextArea placeholder="Opis" value={stanje.description} name="description" onChange={handleInputChange} />
				<Form.Input placeholder="Kategorija" value={stanje.category} name="category" onChange={handleInputChange} />
				<Form.Input placeholder="Date" type="date" value={stanje.date} name="date" onChange={handleInputChange} />
				<Form.Input placeholder="Grad" value={stanje.city} name="city" onChange={handleInputChange} />
				<Form.Input placeholder="Venue" value={stanje.venue} name="venue" onChange={handleInputChange} />
				<Button loading={loading} floated="right" positive type="submit" content="Submit" />
				<Button as={Link} to="/aktivni" floated="right" type="button" content="Cancel" />
			</Form>
		</Segment>
	);
}

export default observer(DetaljForm);
