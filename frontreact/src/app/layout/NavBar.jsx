import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';
// import { useStore } from '../stores/store';

export default function NavBar(props) {
	// const { openForm } = props;
	// const { activityStore } = useStore();
	return (
		<Menu inverted fixed="top">
			<Container>
				<Menu.Item as={NavLink} to="/" exact header>
					<img src="/assets/logo.png" alt="logo" style={{ marginRight: '50px' }} />
					Reactivities
				</Menu.Item>
				<Menu.Item as={NavLink} to="/aktivni" name="Activities" />
				<Menu.Item as={NavLink} to="/errors" name="Errors" />
				<Menu.Item>
					{/* <Button positive content="Create Activity" onClick={() => activityStore.openForm()} /> */}
					<Button positive content="Create Activity" as={NavLink} to="/createActivity" />
				</Menu.Item>
			</Container>
		</Menu>
	);
}
