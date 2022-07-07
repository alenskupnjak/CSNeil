import { Fragment } from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashborad';

function App() {
	const [activities, setActivities] = useState([]);
	const [selektiran, setSelektiran] = useState(null);

	console.log('%c activities= ', 'color:green', activities);

	useEffect(() => {
		axios.get('http://localhost:5000/api/ActivitiesTable').then(res => {
			console.log('%c 00 ', 'color:green', res);

			setActivities(res.data);
		});
	}, []);

	function handleSelectActivity(id) {
		console.log('%c id ', 'color:green', id);
		setSelektiran(activities.find(data => data.id === id));
		console.log('%c 00 selektiran ', 'color:green', selektiran);
	}

	function handleCanceledSelectActivity() {
		setSelektiran(null);
		console.log('%c Cancel', 'color:red', selektiran);
	}

	return (
		<Fragment>
			<NavBar />
			<Container style={{ marginTop: '100px' }}>
				<ActivityDashboard
					activities={activities}
					selektiran={selektiran}
					selectActivity={handleSelectActivity}
					canceledSelectActivity={handleCanceledSelectActivity}
				/>
			</Container>
		</Fragment>
	);
}

export default App;
