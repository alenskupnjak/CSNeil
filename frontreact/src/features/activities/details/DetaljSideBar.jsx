import React from 'react';
import { Segment, List, Label, Item, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

function DetaljSideBar({ selektiran }) {
	const { attendees, host } = selektiran;
	console.log('%c 0000000000000000 ', 'color:green', attendees);
	console.log('%c 0000000000000000 ', 'color:green', host);

	if (!selektiran) return null;
	return (
		<React.Fragment>
			<Segment textAlign="center" style={{ border: 'none' }} attached="top" secondary inverted color="teal">
				{selektiran.length} {selektiran.length === 1 ? 'Osoba' : 'Ljudi'}
			</Segment>
			<Segment attached>
				<List relaxed divided>
					{attendees.map(data => (
						<Item style={{ position: 'relative' }} key={data.username}>
							{data.username === host?.username && (
								<Label style={{ position: 'absolute' }} color="orange" ribbon="right">
									DOMACIN
								</Label>
							)}
							<Image size="tiny" src={data.image || '/assets/user.png'} />
							<Item.Content verticalAlign="middle">
								<Item.Header as="h3">
									<Link to={`/profiles/${data.username}`}>{data.displayName}</Link>
								</Item.Header>
								{data.following && <Item.Extra style={{ color: 'red' }}>Slijedim</Item.Extra>}
								{data.following && <h2>tu sam</h2>}
							</Item.Content>
						</Item>
					))}
				</List>
			</Segment>
		</React.Fragment>
	);
}

export default observer(DetaljSideBar);
