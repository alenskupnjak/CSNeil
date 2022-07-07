import React from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';

export default function ActivityList(props) {
	const { activities, selectActivity } = props;
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
								<Button floated="right" content="view" color="blue" onClick={() => selectActivity(data.id)} />
								<Label bacic content={data.category} />
							</Item.Extra>
						</Item.Content>
					</Item>
				))}
			</Item.Group>
		</Segment>
	);
}
