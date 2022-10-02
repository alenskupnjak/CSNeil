import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useStore } from '../../app/stores/store';
import ProfileContent from './ProfileContent';
import ProfileHeader from './ProfileHeader';

export default observer(function ProfilePage() {
	const { username } = useParams();
	const { profileStore } = useStore();
	const { loadingProfile, loadProfile, profile, setActiveTab } = profileStore;
	const history = useHistory();

	useEffect(() => {
		loadProfile(username);
		history.push(history.location);

		return () => {
			setActiveTab(0);
		};
	}, [loadProfile, username]);

	if (loadingProfile) return <LoadingComponent content="Loading profile..." />;

	return (
		<Grid>
			<Grid.Column width={16}>
				{profile && (
					<React.Fragment>
						<ProfileHeader profile={profile} />
						<ProfileContent profile={profile} />
					</React.Fragment>
				)}
			</Grid.Column>
		</Grid>
	);
});
