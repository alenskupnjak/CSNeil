import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Image, List, Popup } from 'semantic-ui-react';
import ProfileCard from '../../profiles/ProfileCard';

function ActivityListItemAttendee({ attendees }) {
	if (!attendees) return;
	const styles = {
		borderColor: 'gold',
		borderWidth: 4,
	};
	return (
		<List horizontal>
			{attendees.map(data => (
				<Popup
					hoverable
					key={data.username}
					trigger={
						<List.Item key={data.username} as={Link} to={`/profiles/${data.username}`}>
							<Image
								size="mini"
								circular
								src={data.image || '/assets/user.png'}
								bordered
								style={data.following ? styles : null}
							/>
						</List.Item>
					}
				>
					<Popup.Content>
						<ProfileCard profile={data} />
					</Popup.Content>
				</Popup>
			))}
		</List>
	);
}

export default observer(ActivityListItemAttendee);
