import React, { Fragment } from 'react';
import { observer } from 'mobx-react-lite';
import { Container } from 'semantic-ui-react';
import NavBar from './app/layout/NavBar';
import ActivityDashboard from './features/activities/dashboard/ActivityDashborad';
import { Route, Switch, useLocation } from 'react-router-dom';
import HomePage from './features/home/HomePage';
import DetaljForm from './features/activities/form/DetaljForm';
import Detalji from './features/activities/details/Detalji';
import TestErrors from './features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from './features/errors/NotFound';

function App() {
	const location = useLocation();

	return (
		<Fragment>
			<ToastContainer position="bottom-right" />
			<Route exact path="/" component={HomePage} />
			<Route
				path={'/(.+)'}
				render={() => (
					<div>
						<NavBar />
						<Container style={{ marginTop: '100px' }}>
							<Switch>
								<Route exact path="/aktivni" component={ActivityDashboard} />
								<Route exact path="/aktivni/:id" component={Detalji} />
								<Route key={location.key} path={['/createActivity', '/manage/:id']} component={DetaljForm} />
								<Route path={['/errors']} component={TestErrors} />
								<Route component={NotFound} />
							</Switch>
						</Container>
					</div>
				)}
			/>
		</Fragment>
	);
}

export default observer(App);
