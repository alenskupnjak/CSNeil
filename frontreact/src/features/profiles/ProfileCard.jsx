import React from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Card, Icon, Image } from 'semantic-ui-react';

function ProfileCard({ profile }) {
	console.log('%c 16 ', 'color:green', profile);
	function truncate(str) {
		if (str) {
			return str.length > 40 ? str.substring(0, 37) + '...' : str;
		}
	}

	return (
		<Card as={Link} to={`/profiles/${profile.username}`}>
			<Image src={profile.image || '/assets/user.png'} />
			<Card.Content>
				<Card.Header>{profile.displayName}</Card.Header>
				<Card.Description>{truncate(profile.bio)}</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<Icon name="user" />
				20 followers
			</Card.Content>
		</Card>
	);
}

export default observer(ProfileCard);
