import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Form as FormSemanitic, FormField, Header, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { Link, useHistory, useParams } from 'react-router-dom';
import LoadingData from '../../../app/layout/LoadingData';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTexInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryOptions } from '../../../app/common/options/categoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';

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
		date: '',
		city: 'Gard',
		venue: '',
	});

	const validationSchema = Yup.object({
		title: Yup.string().required('The activity title je obavezno!'),
		description: Yup.string().required('The activity description is required'),
		category: Yup.string().required(),
		date: Yup.string().required('Date je obavezno').nullable(),
		venue: Yup.string().required(),
		city: Yup.string().required(),
	});

	useEffect(() => {
		if (id) {
			loadActivity(id);
			selektiran && setStanje(selektiran);
		}
	}, [id, loadActivity]);

	// submit samop za UI-form
	function handleSubmitFormik(values) {
		console.log('%c values= ', 'color:green', values);

		if (values.id) {
			updateActivity(values);
			history.push(`/aktivni/${values.id}`);
		} else {
			createActivity(values);
			history.push(`/aktivni`);
		}
	}
	// submit samop za UI-form
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

	// samo za UI-form
	function handleInputChange(e) {
		const { name, value } = e.target;
		setStanje({ ...stanje, [name]: value });
	}

	if (loadingInitial) return <LoadingData content="Loading data..u DetaljFORM   005 ....." />;

	return (
		<Segment clearing>
			<Header content="Activity Details" sub color="teal" />
			<Formik
				validationSchema={validationSchema}
				enableReinitialize
				initialValues={stanje}
				onSubmit={async values => {
					console.log('%c SUBMIT ', 'color:blue', values);
					// Ovo je caka kako napraviti pauzu...
					// await new Promise(r => setTimeout(r, 2000));
					// alert(JSON.stringify(values, null, 2));
					handleSubmitFormik(values);
				}}
			>
				{/* 
				  https://formik.org/docs/tutorial
					handleSubmit: A submission handler
					handleChange: A change handler to pass to each <input>, <select>, or <textarea>
					values: Our form’s current values 
					Ne treba... ! radi automatskevalue={values.category} ..... onChange={handleChange}
					*/}
				{({ handleSubmit, isValid, isSubmitting, dirty }) => (
					<Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
						<h1 style={{ color: 'red' }}>DetaljiFORM Formic</h1>
						<FormField>
							<Field placeholder="Title" name="title" />
							<ErrorMessage
								name="title"
								render={err => {
									return <Label basic color="red" content={err} />;
								}}
							/>
						</FormField>
						<MyTextArea rows={3} placeholder="Opis" name="description" />
						<MySelectInput options={categoryOptions} placeholder="Kategorija" name="category" />
						<MyDateInput
							placeholderText="Date"
							name="date"
							showTimeSelect
							timeCaption="time"
							dateFormat="MMMM d, yyyy h:mm aa"
						/>
						<Header content="Location Details" sub color="teal" />
						<MyTextInput placeholder="Grad" name="city" />
						<MyTextInput placeholder="Venue" name="venue" />
						<Button
							disabled={isSubmitting || !dirty || !isValid}
							loading={loading}
							floated="right"
							positive
							type="submit"
							content="Submit Formik"
						/>
						<Button as={Link} to="/aktivni" floated="right" type="button" content="Cancel Formik " />
					</Form>
				)}
			</Formik>
			<div style={{ marginTop: '100px' }}>-------- Ispod UI semantic---------------</div>
			<FormSemanitic onSubmit={handleSubmitForm} autoComplete="off">
				<h1 style={{ color: 'blue' }}>DetaljiFORM iz UI Semantic</h1>
				<FormSemanitic.Input placeholder="Title" value={stanje.title} name="title" onChange={handleInputChange} />
				<FormSemanitic.TextArea
					placeholder="Opis"
					value={stanje.description}
					name="description"
					onChange={handleInputChange}
				/>
				<FormSemanitic.Input
					placeholder="Kategorija"
					value={stanje.category}
					name="category"
					onChange={handleInputChange}
				/>
				<FormSemanitic.Input
					placeholder="Date"
					type="date"
					value={stanje.date}
					name="date"
					onChange={handleInputChange}
				/>
				<FormSemanitic.Input placeholder="Grad" value={stanje.city} name="city" onChange={handleInputChange} />
				<FormSemanitic.Input placeholder="Venue" value={stanje.venue} name="venue" onChange={handleInputChange} />
				<Button loading={loading} floated="right" positive type="submit" content="Submit" />
				<Button as={Link} to="/aktivni" floated="right" type="button" content="Cancel" />
			</FormSemanitic>
		</Segment>
	);
}

export default observer(DetaljForm);
