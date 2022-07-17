import React, { Fragment } from 'react';
import { observer } from 'mobx-react-lite';
import { Container } from 'semantic-ui-react';
import NavBar from './app/layout/NavBar';
import ActivityDashboard from './features/activities/dashboard/ActivityDashborad';
import { Route, useLocation } from 'react-router-dom';
import HomePage from './features/home/HomePage';
import DetaljForm from './features/activities/form/DetaljForm';
import Detalji from './features/activities/details/Detalji';

function App() {
	const location = useLocation();

	return (
		<Fragment>
			<Route exact path="/" component={HomePage} />
			<Route
				path={'/(.+)'}
				render={() => (
					<div>
						<NavBar />
						<Container style={{ marginTop: '100px' }}>
							<Route exact path="/aktivni" component={ActivityDashboard} />
							<Route exact path="/aktivni/:id" component={Detalji} />
							<Route key={location.key} path={['/createActivity', '/manage/:id']} component={DetaljForm} />
						</Container>
					</div>
				)}
			/>
		</Fragment>
	);
}

export default observer(App);
