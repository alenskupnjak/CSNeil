import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Button, Card, Grid, Header, Image, Tab } from 'semantic-ui-react';
import PhotoUploadWidget from '../../app/common/imageUpload/PhotoUploadWidget';
import { useStore } from '../../app/stores/store';

export default observer(function ProfilePhotos({ profile }) {
	const { profileStore } = useStore();
	const { isCurrentUser, uploadPhoto, uploading, loading, setMainPhoto, deletePhoto } = profileStore;

	const [addPhotoMode, setAddPhotoMode] = useState(false);
	const [target, setTarget] = useState('');

	async function handlePhotoUpload(file) {
		// uploadPhoto(file).then(() => setAddPhotoMode(false));
		await uploadPhoto(file);
		setAddPhotoMode(false);
	}

	function handleSetMainPhoto(photo, e) {
		setTarget(e.currentTarget.name);
		setMainPhoto(photo);
	}

	function handleDeletePhoto(photo, e) {
		console.log('%c 00 ', 'color:green', photo);

		setTarget(e.currentTarget.name);
		deletePhoto(photo);
	}

	console.log('%c 00 profile.photos', 'color:green', profile.photos);

	return (
		<Tab.Pane>
			<Grid>
				<Grid.Column width={16}>
					<Header floated="left" icon="image" content="Photos" />
					{isCurrentUser && (
						<Button
							floated="right"
							basic
							content={addPhotoMode ? 'Cancel' : 'Dodaj Photo'}
							onClick={() => setAddPhotoMode(!addPhotoMode)}
						/>
					)}
				</Grid.Column>
				<Grid.Column width={16}>
					{addPhotoMode ? (
						<PhotoUploadWidget uploadPhoto={handlePhotoUpload} loading={uploading} />
					) : (
						<Card.Group itemsPerRow={5}>
							{profile.photos?.map(photo => (
								<Card key={photo.id}>
									<Image src={photo.url} />
									{isCurrentUser && (
										<Button.Group fluid widths={2}>
											<Button
												basic
												color="green"
												content="Main"
												name={'main' + photo.id}
												disabled={photo.isMain}
												loading={target === 'main' + photo.id && loading}
												onClick={e => handleSetMainPhoto(photo, e)}
											/>
											<Button
												basic
												color="red"
												icon="trash"
												loading={target === photo.id && loading}
												onClick={e => handleDeletePhoto(photo, e)}
												disabled={photo.isMain}
												name={photo.id}
											/>
										</Button.Group>
									)}
								</Card>
							))}
						</Card.Group>
					)}
				</Grid.Column>
			</Grid>
		</Tab.Pane>
	);
});
