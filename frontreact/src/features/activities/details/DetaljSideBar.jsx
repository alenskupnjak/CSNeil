import React from 'react';
import { Segment, List, Label, Item, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

function DetaljSideBar({ selektiran }) {
	const { attendees, host } = selektiran;

	if (!selektiran) return null;
	return (
		<React.Fragment>
			<Segment textAlign="center" style={{ border: 'none' }} attached="top" secondary inverted color="teal">
				{selektiran.length} {selektiran.length === 1 ? 'Osoba' : 'Ljudi'}
			</Segment>
			<Segment attached>
				<List relaxed divided>
					{attendees.map(attendee => (
						<Item style={{ position: 'relative' }} key={attendee.username}>
							{attendee.username === host?.username && (
								<Label style={{ position: 'absolute' }} color="orange" ribbon="right">
									DOMACIN
								</Label>
							)}
							<Image size="tiny" src={attendee.image || '/assets/user.png'} />
							<Item.Content verticalAlign="middle">
								<Item.Header as="h3">
									<Link to={`/profiles/${attendee.username}`}>{attendee.displayName}</Link>
								</Item.Header>
								<Item.Extra style={{ color: 'orange' }}>Following</Item.Extra>
							</Item.Content>
						</Item>
					))}
				</List>
			</Segment>
		</React.Fragment>
	);
}

export default observer(DetaljSideBar);
