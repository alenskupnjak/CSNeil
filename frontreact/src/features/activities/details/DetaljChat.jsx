import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Segment, Header, Comment, Button, Loader } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Form, Field, FieldProps } from 'formik';
import MyTextArea from '../../../app/common/form/MyTextArea';
import { formatDistanceToNow } from 'date-fns';

function DetaljChat({ activityId }) {
	const { commentStore } = useStore();

	console.log('%c 01 selektiran ', 'color:gold', commentStore.comments);

	useEffect(() => {
		if (activityId) {
			commentStore.createHubConnection(activityId);
		}
		return () => {
			commentStore.clearComments();
		};
	}, [commentStore, activityId]);

	return (
		<React.Fragment>
			<Segment textAlign="center" attached="top" inverted color="teal" style={{ border: 'none' }}>
				<Header>Chat about this event</Header>
			</Segment>

			<Segment attached clearing>
				<Formik
					onSubmit={(values, { resetForm }) => commentStore.addComment(values).then(() => resetForm())}
					initialValues={{ body: '' }}
					validationSchema={Yup.object({
						body: Yup.string().required(),
					})}
				>
					{({ isSubmitting, isValid, handleSubmit }) => (
						<Form className="ui form">
							<Field name="body">
								{props => (
									<div style={{ position: 'relative' }}>
										<Loader active={isSubmitting} />
										<textarea
											placeholder="Enter your comment (Enter to submit, SHIFT + enter for new line)"
											rows={2}
											{...props.field}
											onKeyPress={e => {
												// Nova linija
												if (e.key === 'Enter' && e.shiftKey) {
													return;
												}
												if (e.key === 'Enter' && !e.shiftKey) {
													e.preventDefault();
													isValid && handleSubmit();
												}
											}}
										/>
									</div>
								)}
							</Field>
						</Form>
					)}
				</Formik>
				<Comment.Group>
					{commentStore &&
						commentStore.comments.map(comment => {
							// console.log('%c 00 ', 'color:blue', comment.createdAt);

							return (
								<Comment key={comment.id}>
									<Comment.Avatar src={comment.image || '/assets/user.png'} />
									<Comment.Content>
										<Comment.Author as={Link} to={`/profiles/${comment.username}`}>
											{comment.displayName}
										</Comment.Author>
										<Comment.Metadata>
											<div>{formatDistanceToNow(comment.createdAt)} ago</div>
										</Comment.Metadata>
										<Comment.Text style={{ whiteSpace: 'pre-wrap' }}>{comment.body}</Comment.Text>
									</Comment.Content>
								</Comment>
							);
						})}
				</Comment.Group>
				{/* <Formik
					onSubmit={(values, { resetForm }) => commentStore.addComment(values).then(() => resetForm())}
					initialValues={{ body: '' }}
					validationSchema={Yup.object({
						body: Yup.string().required(),
					})}
				>
					{({ isSubmitting, isValid }) => (
						<Form className="ui form">
							<MyTextArea placeholder="Add comment" name="body" rows={2}></MyTextArea>
							<Button
								loading={isSubmitting}
								disabled={isSubmitting || !isValid}
								content="Dodaj"
								icon="edit"
								primary
								floated="right"
								type="submit"
							></Button>
						</Form>
					)}
				</Formik> */}
			</Segment>
		</React.Fragment>
	);
}

export default observer(DetaljChat);
