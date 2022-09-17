import { observer } from 'mobx-react-lite';
import React from 'react';
import { Tab } from 'semantic-ui-react';
import ProfilePhotos from './ProfilePhotos';
import ProfileAbout from './ProfileAbout';

function ProfileContent({ profile }) {
	const panes = [
		{ menuItem: 'About', render: () => <ProfileAbout /> },
		{ menuItem: 'Photos', render: () => <ProfilePhotos profile={profile} /> },
		{ menuItem: 'Events', render: () => <Tab.Pane>Events Content</Tab.Pane> },
		{ menuItem: 'Followers', render: () => <Tab.Pane>Followers Content</Tab.Pane> },
		{ menuItem: 'Following', render: () => <Tab.Pane>Following Content</Tab.Pane> },
	];

	return <Tab menu={{ fluid: true, vertical: true }} menuPosition="right" panes={panes} />;
}

export default observer(ProfileContent);
