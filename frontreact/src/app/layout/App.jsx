import { Fragment } from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashborad';

function App() {
	const [activities, setActivities] = useState([]);
	const [selektiran, setSelektiran] = useState(null);
	const [editMode, setEditMode] = useState(false);

	useEffect(() => {
		axios.get('http://localhost:5000/api/ActivitiesTable').then(res => {
			setActivities(res.data);
		});
	}, []);

	function handleSelectActivity(id) {
		setSelektiran(activities.find(data => data.id === id));
	}

	function handleCanceledSelectActivity() {
		setSelektiran(null);
	}

	function handleFormOpen(id) {
		console.log('%c id ************ ', 'color:green', id);

		id ? handleSelectActivity(id) : handleCanceledSelectActivity();
		setEditMode(true);
	}

	function handleFormClose() {
		setEditMode(false);
	}

	return (
		<Fragment>
			<NavBar 		openForm={handleFormOpen} />
			<Container style={{ marginTop: '100px' }}>
				<ActivityDashboard
					activities={activities}
					selektiran={selektiran}
					selectActivity={handleSelectActivity}
					canceledSelectActivity={handleCanceledSelectActivity}
					editMode={editMode}
					openForm={handleFormOpen}
					closeForm={handleFormClose}
				/>
			</Container>
		</Fragment>
	);
}

export default App;
