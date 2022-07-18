import React, { Fragment, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

function ActivityListItem({ item, index }) {
	// const { activityStore } = useStore();
	// const { deleteActivity, loading } = activityStore;
	// const [target, setTarget] = useState('');

	// function handleDelete(e, id) {
	// 	setTarget(e.target.name);
	// 	deleteActivity(id);
	// }

	return (
		<Fragment>
			<Segment.Group divided>
				<Segment>
					<Item.Group>
						<Item>
							<Item.Image size="tiny" circular src="/assets/user.png" />
							<Item.Content>
								<Item.Header as={Link} to={`/aktivni/${item.id}`}>
									{item.title}
								</Item.Header>
								<Item.Description>Hosted by Neko</Item.Description>
							</Item.Content>
						</Item>
					</Item.Group>
				</Segment>
				<Segment>
					<span>
						<Icon name="clock" /> {item.date}
						<Icon name="marker" /> {item.venue}
					</span>
				</Segment>
				<Segment secondary>Nesto tu dode</Segment>
				<Segment clearing>
					<span>{item.description}</span>
					<Button as={Link} to={`/aktivni/${item.id}`} color="teal" floated="right" content="Pogled" />
				</Segment>
			</Segment.Group>
		</Fragment>
	);
}

export default observer(ActivityListItem);
