import { observer } from 'mobx-react-lite';
import React from 'react';
import { Tab } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import ProfilePhotos from './ProfilePhotos';
import ProfileAbout from './ProfileAbout';
import ProfileFollowings from './ProfileFollowings';
import ProfileActivities from './ProfileActivities';

function ProfileContent({ profile }) {
	const { profileStore } = useStore();
	const panes = [
		{ menuItem: 'About', render: () => <ProfileAbout /> },
		{ menuItem: 'Photos', render: () => <ProfilePhotos profile={profile} /> },
		{ menuItem: 'Events', render: () => <ProfileActivities /> },
		{ menuItem: 'Followers - Koje slijedim', render: () => <ProfileFollowings /> },
		{ menuItem: 'Following- koji me slijede', render: () => <ProfileFollowings /> },
	];

	return (
		<Tab
			menu={{ fluid: true, vertical: true }}
			menuPosition="right"
			panes={panes}
			onTabChange={(e, data) => profileStore.setActiveTab(data.activeIndex)}
		/>
	);
}

export default observer(ProfileContent);
