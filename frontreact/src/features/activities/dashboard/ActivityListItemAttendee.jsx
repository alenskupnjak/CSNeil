import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Image, List, Popup } from 'semantic-ui-react';
// import ProfileCard from '../../profiles/ProfileCard';

export default observer(function ActivityListItemAttendee({ attendees }) {
	return (
		<List horizontal>
			<h2>ajmoo</h2>
			{attendees.map(attendee => (
				<Popup
					hoverable
					key={attendee.username}
					trigger={
						<List.Item key={attendee.username} as={Link} to={`/profiles/${attendee.username}`}>
							<Image size="mini" circular src={attendee.image || '/assets/user.png'} />
						</List.Item>
					}
				>
					<Popup.Content>{/* <ProfileCard profile={attendee} /> */}</Popup.Content>
				</Popup>
			))}
		</List>
	);
});
