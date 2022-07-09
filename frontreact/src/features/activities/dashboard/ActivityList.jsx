import { React, useState } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';

function ActivityList(props) {
	const { activities, selectActivity, deleteActivity, snimanje } = props;

	const [target, setTarget] = useState('');

	function handleDelete(e, id) {
		setTarget(e.target.name);
		deleteActivity(id);
	}

	return (
		<Segment>
			<Item.Group divided>
				{activities.map(data => (
					<Item key={data.id}>
						<Item.Content>
							<Item.Header as="a">{data.title}</Item.Header>
							<Item.Meta>{data.date}</Item.Meta>
							<Item.Description>
								<div>{data.description}</div>
								<div>
									{data.city}, {data.venue}
								</div>
							</Item.Description>
							<Item.Extra>
								<Button floated="right" content="View" color="blue" onClick={() => selectActivity(data.id)} />
								<Button
									name={data.id}
									floated="right"
									content="Delete"
									color="red"
									loading={snimanje && target === data.id}
									onClick={e => handleDelete(e, data.id)}
								/>
								<Label bacic content={data.category} />
							</Item.Extra>
						</Item.Content>
					</Item>
				))}
			</Item.Group>
		</Segment>
	);
}

export default ActivityList;
