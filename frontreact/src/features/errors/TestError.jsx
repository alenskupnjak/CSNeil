import React from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Header, Segment } from 'semantic-ui-react';
import axios from 'axios';
import { useState } from 'react';
import ValidationErrors from './ValidationErrors';

function TestErrors() {
	const baseUrl = 'http://localhost:5000/api/';
	const [errors, setErrors] = useState(null);

	function handleNotFound() {
		axios.get(baseUrl + 'buggy/not-found').catch(err => console.log('014', err.response));
	}

	function handleBadRequest() {
		axios.get(baseUrl + 'buggy/bad-request').catch(err => {
			console.log('015', err.response);
			setErrors(null);
		});
	}

	function handleServerError() {
		axios.get(baseUrl + 'buggy/server-error').catch(err => console.log('016', err.response));
	}

	function handleUnauthorised() {
		axios.get(baseUrl + 'buggy/unauthorised').catch(err => console.log('017', err.response));
	}

	function handleBadGuid() {
		axios.get(baseUrl + 'ActivitiesTable/notaguid').catch(err => console.log('018', err.response));
	}

	function handleValidationError() {
		axios.post(baseUrl + 'ActivitiesTable', {}).catch(err => {
			console.log('019 ', err);
			setErrors(err);
		});
	}

	return (
		<>
			<Header as="h1" content="Test Error component" />
			<Segment>
				<Button.Group widths="7">
					<Button onClick={handleNotFound} content="Not Found" basic primary />
					<Button onClick={handleBadRequest} content="Bad Request" basic primary />
					<Button onClick={handleValidationError} content="Validation Error" basic positive />
					<Button onClick={handleServerError} content="Server Error" basic primary />
					<Button onClick={handleUnauthorised} content="Unauthorised" basic primary />
					<Button onClick={handleBadGuid} content="Bad Guid" basic primary />
				</Button.Group>
			</Segment>
			{errors && <ValidationErrors errors={errors} />}
		</>
	);
}

export default observer(TestErrors);
