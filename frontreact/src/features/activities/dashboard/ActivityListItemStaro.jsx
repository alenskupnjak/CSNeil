import React, { Fragment, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

function ActivityListItemStaro({ item, index }) {
	const { activityStore } = useStore();
	const { deleteActivity, loading } = activityStore;
	const [target, setTarget] = useState('');

	function handleDelete(e, id) {
		setTarget(e.target.name);
		deleteActivity(id);
	}

	return (
		<Fragment>
			<Item key={item.id} style={{ backgroundColor: 'gold' }}>
				<Item.Content>
					<Item.Header as="a">
						{index + 1} {item.title}
					</Item.Header>
					<Item.Meta>{item.date}</Item.Meta>
					<Item.Description>
						<div>{item.description}</div>
						<div>
							{item.city}, {item.venue}
						</div>
					</Item.Description>
					<Item.Extra>
						<Button
							floated="right"
							content="View"
							color="blue"
							// onClick={() => activityStore.selectActivity(item.id)}
							as={Link}
							to={`/aktivni/${item.id}`}
						/>
						<Button
							name={item.id}
							floated="right"
							content="Delete"
							color="red"
							loading={loading && target === item.id}
							onClick={e => handleDelete(e, item.id)}
						/>
						<Label basic content={item.category} />
					</Item.Extra>
				</Item.Content>
			</Item>
		</Fragment>
	);
}

export default observer(ActivityListItemStaro);
