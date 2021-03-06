import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Item, Segment, Image } from 'semantic-ui-react';
import { format } from 'date-fns';
// import { Activity } from '../../../app/models/selektiran';

const activityImageStyle = {
	filter: 'brightness(20%)',
};

const activityImageTextStyle = {
	position: 'absolute',
	bottom: '5%',
	left: '5%',
	width: '100%',
	height: 'auto',
	color: 'white',
};

export default observer(function DetaljHeader({ selektiran }) {
	return (
		<Segment.Group>
			<Segment basic attached="top" style={{ padding: '0' }}>
				<Image src={`/assets/categoryImages/${selektiran.category}.jpg`} fluid style={activityImageStyle} />
				<Segment style={activityImageTextStyle} basic>
					<Item.Group>
						<Item>
							<Item.Content>
								<Header size="huge" content={selektiran.title} style={{ color: 'white' }} />
								<p>{format(new Date(selektiran.date), 'MM/yyyy')}</p>
								<p>
									Hosted by <strong>Bob</strong>
								</p>
							</Item.Content>
						</Item>
					</Item.Group>
				</Segment>
			</Segment>
			<Segment clearing attached="bottom">
				<Button color="teal">Join Activity</Button>
				<Button>Cancel attendance</Button>
				<Button as={Link} to={`/manage/${selektiran.id}`} color="orange" floated="right">
					Manage Event
				</Button>
			</Segment>
		</Segment.Group>
	);
});
