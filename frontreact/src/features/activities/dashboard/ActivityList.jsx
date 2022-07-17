import { React, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { Link } from 'react-router-dom';

function ActivityList(props) {
	const { activityStore } = useStore();
	const { activities, deleteActivity, loading } = activityStore;
	const [target, setTarget] = useState('');

	function handleDelete(e, id) {
		setTarget(e.target.name);
		deleteActivity(id);
	}
	console.log('%c activities= ', 'color:pink', activities);

	return (
		<Segment>
			<Item.Group divided>
				{activities.map((data, index) => (
					<Item key={data.id}>
						<Item.Content>
							<Item.Header as="a">
								{index + 1} {data.title}
							</Item.Header>
							<Item.Meta>{data.date}</Item.Meta>
							<Item.Description>
								<div>{data.description}</div>
								<div>
									{data.city}, {data.venue}
								</div>
							</Item.Description>
							<Item.Extra>
								<Button
									floated="right"
									content="View"
									color="blue"
									// onClick={() => activityStore.selectActivity(data.id)}
									as={Link}
									to={`/aktivni/${data.id}`}
								/>
								<Button
									name={data.id}
									floated="right"
									content="Delete"
									color="red"
									loading={loading && target === data.id}
									onClick={e => handleDelete(e, data.id)}
								/>
								<Label basic content={data.category} />
							</Item.Extra>
						</Item.Content>
					</Item>
				))}
			</Item.Group>
		</Segment>
	);
}

export default observer(ActivityList);
