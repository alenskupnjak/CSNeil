import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Item, Segment, Image, Label } from 'semantic-ui-react';
import { format } from 'date-fns';
import { useStore } from '../../../app/stores/store';

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
	const { isHost, isGoing } = selektiran;
	const { activityStore } = useStore();
	if (!selektiran) return null;
	return (
		<Segment.Group>
			<Segment basic attached="top" style={{ padding: '0' }}>
				{selektiran.isCancelled && (
					<Label
						style={{ position: 'absolute', zIndex: 1000, left: -14, top: 20 }}
						ribbon
						color="red"
						content="Cancelled"
					/>
				)}
				<Image src={`./assets/categoryImages/${selektiran.category}.jpg`} fluid style={activityImageStyle} />
				<Segment style={activityImageTextStyle} basic>
					<Item.Group>
						<Item>
							<Item.Content>
								<Header size="huge" content={selektiran.title} style={{ color: 'white' }} />
								<p>{format(new Date(selektiran.date), 'MM/yyyy')}</p>
								<p>
									Hosted by{' '}
									<strong>
										<Link to={`/profiles/${selektiran.host?.username}`}>{selektiran.host?.displayName}</Link>
									</strong>
								</p>
							</Item.Content>
						</Item>
						{selektiran.id}
					</Item.Group>
				</Segment>
			</Segment>
			<Segment clearing attached="bottom">
				{isHost ? (
					<React.Fragment>
						<Button
							color={selektiran.isCancelled ? 'green' : 'red'}
							floated="left"
							basic
							content={selektiran.isCancelled ? 'Re-activate Activity' : 'Cancel Activity'}
							onClick={activityStore.cancelActivityToggle}
							loading={activityStore.loading}
						/>
						<Button
							as={Link}
							disabled={selektiran.isCancelled}
							to={`/manage/${selektiran.id}`}
							color="orange"
							floated="right"
						>
							Uredi Event
						</Button>
					</React.Fragment>
				) : isGoing ? (
					<Button loading={activityStore.loading} onClick={activityStore.updateAttendance}>
						Otkaži
					</Button>
				) : (
					<Button
						disabled={selektiran.isCancelled}
						loading={activityStore.loading}
						onClick={activityStore.updateAttendance}
						color="teal"
					>
						Join Activity
					</Button>
				)}
			</Segment>
		</Segment.Group>
	);
});
