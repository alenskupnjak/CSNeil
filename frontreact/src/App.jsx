import React, { Fragment, useEffect } from 'react';
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
import ServerError from './features/errors/ServerError';
import LoginForm from './features/users/LoginForm';
import { useStore } from './app/stores/store';
import LoadingData from './app/layout/LoadingData';
import ModalContainer from './app/common/modals/ModalContainer';
import ProfilePage from './features/profiles/ProfilePage';

function App() {
	const location = useLocation();
	const { commonStore, userStore } = useStore();

	// napravio sam preko stora ne volim useEffect
	// useEffect(() => {
	// 	if (commonStore.token) {
	// 		userStore.getUser().finally(() => commonStore.setAppLoaded());
	// 	} else {
	// 		commonStore.setAppLoaded();
	// 	}
	// }, [commonStore, userStore]);

	if (!commonStore.appLoaded) return <LoadingData content="Loading APP..." />;

	return (
		<Fragment>
			<ToastContainer position="bottom-right" />
			<ModalContainer />
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
								<Route path="/profiles/:username" component={ProfilePage} />
								<Route path={['/errors']} component={TestErrors} />
								<Route path={['/server-error']} component={ServerError} />
								<Route path={['/login']} component={LoginForm} />
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
