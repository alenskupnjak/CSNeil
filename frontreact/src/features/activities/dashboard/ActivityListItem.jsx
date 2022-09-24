import React, { Fragment } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Label, Segment } from 'semantic-ui-react';
import { format } from 'date-fns';
import { useStore } from '../../../app/stores/store';
import ActivityListItemAttendee from './ActivityListItemAttendee';

function ActivityListItem({ item, domacin }) {
	const { activityStore } = useStore();

	return (
		<Fragment>
			<Segment.Group divided="true" style={{ marginBottom: '30px' }}>
				<Segment>
					{item.isCancelled && (
						<Label
							attached="top"
							color="purple"
							content="Cancelled"
							style={{ textAlign: 'center', color: '#f44336' }}
						/>
					)}
					<Item.Group>
						<Item>
							<Item.Image
								style={{ marginBottom: 5 }}
								size="tiny"
								circular
								src={item.host?.image || '/assets/user.png'}
							/>
							<Item.Content>
								<Item.Header as={Link} to={`/aktivni/${item.id}`}>
									{item.title}
								</Item.Header>
								<Item.Description>
									Domacin je
									<Link to={`/profiles/${item.hostUsername}`}> {domacin?.displayName}</Link>
								</Item.Description>
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
					<Button onClick={() => activityStore.deleteActivity(item.id)} color="red" floated="left" content="Brisi" />
					<Button as={Link} to={`/aktivni/${item.id}`} color="teal" floated="right" content="Pogled" />
				</Segment>
			</Segment.Group>
		</Fragment>
	);
}

export default observer(ActivityListItem);
