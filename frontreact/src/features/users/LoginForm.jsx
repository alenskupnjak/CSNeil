import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Header, Label } from 'semantic-ui-react';
import MyTextInput from '../../app/common/form/MyTexInput';
import { useStore } from '../../app/stores/store';

export default observer(function LoginForm() {
	const { userStore } = useStore();
	console.log('%c userStore = ', 'color:green', userStore);

	// {isSubmitting}: boolean   FORMIK ugradena funkciaj
	// Submitting state of the form. Returns true if submission is in progress and false otherwise.
	// IMPORTANT: Formik will set this to true as soon as submission is attempted.

	return (
		<Formik
			initialValues={{ email: 'bob@test.com', password: 'Pa$$w0rd', error: null }}
			onSubmit={(values, { setErrors }) => {
				console.log('%c 32 error= ', 'color:pink', values);
				userStore.login(values).catch(error => {
					console.log('%c LOGIN 30 error= ', 'color:blue', error);
					return setErrors({ error: 'Invalid email or password' });
				});
			}}
		>
			{({ handleSubmit, isSubmitting, errors }) => {
				return (
					<Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
						<Header as="h2" content="Login to Reactivites" color="teal" textAlign="center" />
						<MyTextInput name="email" placeholder="Email" />
						<MyTextInput name="password" placeholder="Password" type="password" />
						<ErrorMessage
							name="error"
							render={() => <Label style={{ marginBottom: 10 }} basic color="red" content={errors.error} />}
						/>
						<Button loading={false} positive content="Login" type="submit" fluid />
					</Form>
				);
			}}
		</Formik>
	);
});
