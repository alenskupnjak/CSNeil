import React, { Fragment, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Label, Segment } from 'semantic-ui-react';
import { format } from 'date-fns';
import { useStore } from '../../../app/stores/store';
import ActivityListItemAttendee from './ActivityListItemAttendee';

function ActivityListItem({ item, index }) {
	const { activityStore } = useStore();
	// console.log('%c 00 item', 'color:red', item);

	// const { activityStore } = useStore();
	// const { deleteActivity, loading } = activityStore;
	// const [target, setTarget] = useState('');

	// function handleDelete(e, id) {
	// 	setTarget(e.target.name);
	// 	deleteActivity(id);
	// }

	return (
		<Fragment>
			<Segment.Group divided="true">
				<Segment>
					<Item.Group>
						<Item>
							<Item.Image size="tiny" circular src="/assets/user.png" />
							<Item.Content>
								<Item.Header as={Link} to={`/aktivni/${item.id}`}>
									{item.title}
								</Item.Header>
								<Item.Description style={{ color: 'red' }}>Domacin je{item.host?.displayName}</Item.Description>
								{item.isHost && (
									<Item.Description>
										<Label basic color="orange">
											You are hosting this activity
										</Label>
									</Item.Description>
								)}
								{item.isGoing && !item.isHost && (
									<Item.Description>
										<Label basic color="green">
											Ti ides na taj tulum
										</Label>
									</Item.Description>
								)}
							</Item.Content>
						</Item>
					</Item.Group>
				</Segment>
				<Segment>
					<span>
						<Icon name="clock" /> {format(new Date(item.date), 'dd-MM-yyyy')}
						<Icon name="clock" /> {item.date}
						<Icon name="marker" /> {item.venue}
					</span>
				</Segment>
				<Segment secondary>
					<ActivityListItemAttendee attendees={item.attendees} />
				</Segment>
				<Segment clearing>
					<span>{item.description}</span>
					<Button onClick={() => activityStore.deleteActivity(item.id)} color="red" floated="right" content="Brisi" />
					<Button as={Link} to={`/aktivni/${item.id}`} color="teal" floated="right" content="Pogled" />
				</Segment>
			</Segment.Group>
		</Fragment>
	);
}

export default observer(ActivityListItem);
