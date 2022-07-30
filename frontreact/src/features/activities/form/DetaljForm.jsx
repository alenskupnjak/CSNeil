import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { Link, useHistory, useParams } from 'react-router-dom';
import LoadingData from '../../../app/layout/LoadingData';
import { Formik, Field, Form as FormFormic } from 'formik';

// function DetaljForm(props) {
// const { createOrEditActivity, snimanje } = props;
function DetaljForm() {
	const { activityStore } = useStore();
	const { selektiran, createActivity, updateActivity, loading, loadActivity, loadingInitial } = activityStore;
	const { id } = useParams();
	const history = useHistory();

	const [stanje, setStanje] = useState({
		id: null,
		title: 'title',
		category: 'Culture',
		description: '',
		date: '2022-07-16',
		city: 'Gard',
		venue: '',
	});

	useEffect(() => {
		if (id) {
			loadActivity(id);
			selektiran && setStanje(selektiran);
		}
	}, [id, loadActivity]);

	// submit
	function handleSubmitForm(e) {
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
			<h1>Sign Up</h1>
			<Formik
				initialValues={{
					firstName: '',
					lastName: '',
					email: '',
					pokus: '',
				}}
				onSubmit={async values => {
					await new Promise(r => setTimeout(r, 500));
					alert(JSON.stringify(values, null, 2));
				}}
			>
				<FormFormic>
					<label htmlFor="firstName">First Name</label>
					<Field id="firstName" name="firstName" placeholder="Jane" />
					<label htmlFor="lastName">Last Name</label>
					<Field id="lastName" name="lastName" placeholder="Doe" />
					<label htmlFor="email">Email</label>
					<Field id="email" name="email" placeholder="jane@acme.com" type="email" />
					<button type="submit">Submit</button>
				</FormFormic>
			</Formik>
			<div style={{ marginTop: '100px' }}>-----------------------</div>
			<Formik
				enableReinitialize
				initialValues={stanje}
				onSubmit={async values => {
					console.log('%c SUBMIT ', 'color:blue', values);
					// await new Promise(r => setTimeout(r, 500));
					alert(JSON.stringify(values, null, 2));
				}}
			>
				{({ values, handleChange, handleSubmit }) => (
					<Form onSubmit={handleSubmit} autoComplete="off">
						<h1 style={{ color: 'red' }}>DetaljiFORM {values.city}</h1>
						<Form.Input placeholder="Title" value={values.title} name="title" onChange={handleChange} />
						<Form.TextArea placeholder="Opis" value={values.description} name="description" onChange={handleChange} />
						<Form.Input placeholder="Kategorija" value={values.category} name="category" onChange={handleChange} />
						<Form.Input placeholder="Date" type="date" value={values.date} name="date" onChange={handleChange} />
						<Form.Input placeholder="Grad" value={values.city} name="city" onChange={handleChange} />
						<Form.Input placeholder="Venue" value={values.venue} name="venue" onChange={handleChange} />
						<Button loading={false} floated="right" positive type="submit" content="Submit Formik" />
						<Button as={Link} to="/aktivni" floated="right" type="button" content="Cancel Formik " />
					</Form>
				)}
			</Formik>
			<div style={{ marginTop: '100px' }}>-----------------------</div>
			<Form onSubmit={handleSubmitForm} autoComplete="off">
				<h1 style={{ color: 'red' }}>DetaljiFORM</h1>
				<Form.Input placeholder="Title" value={stanje.title} name="title" onChange={handleInputChange} />
				<Form.TextArea placeholder="Opis" value={stanje.description} name="description" onChange={handleInputChange} />
				<Form.Input placeholder="Kategorija" value={stanje.category} name="category" onChange={handleInputChange} />
				<Form.Input placeholder="Date" type="date" value={stanje.date} name="date" onChange={handleInputChange} />
				<Form.Input placeholder="Grad" value={stanje.city} name="city" onChange={handleInputChange} />
				<Form.Input placeholder="Venue" value={stanje.venue} name="venue" onChange={handleInputChange} />
				<Button loading={false} floated="right" positive type="submit" content="Submit" />
				<Button as={Link} to="/aktivni" floated="right" type="button" content="Cancel" />
			</Form>
		</Segment>
	);
}

export default observer(DetaljForm);
