import { Fragment } from 'react';
import { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashborad';
import Servisi from '../api/Servisi';
import LoadingData from './LoadingData';
import { v4 as uuid } from 'uuid';

function App() {
	const [activities, setActivities] = useState([]);
	const [selektiran, setSelektiran] = useState(null);
	const [editMode, setEditMode] = useState(false);
	const [loading, setLoading] = useState(true);
	const [snimanje, setSnimanje] = useState(false);

	useEffect(() => {
		// axios.get('http://localhost:5000/api/ActivitiesTable').then(res => {
		// 	setActivities(res.data);
		// });

		Servisi.listSvih().then(res => {
			res.forEach(item => {
				item.date = item.date.split('T')[0];
			});
			setActivities(res);
			setLoading(false);
		});
	}, []);

	function handleSelectActivity(id) {
		setSelektiran(activities.find(data => data.id === id));
	}

	function handleCanceledSelectActivity() {
		setSelektiran(null);
	}

	function handleFormOpen(id) {
		id ? handleSelectActivity(id) : handleCanceledSelectActivity();
		setEditMode(true);
	}

	function handleFormClose() {
		setEditMode(false);
	}

	function handleCreateOrEditActivity(aktivnost) {
		setSnimanje(true);

		if (aktivnost.id) {
			Servisi.update(aktivnost)
				.then(() => {
					setActivities([
						...activities.filter(data => {
							return data.id !== aktivnost.id;
						}),
						aktivnost,
					]);

					setSelektiran(aktivnost);
					setEditMode(false);
					setSnimanje(false);
				})
				.catch(err => {
					console.log('%c err ', 'color:red', err);
				});
		} else {
			aktivnost.id = uuid();
			Servisi.kreiraj(aktivnost).then(() => {
				setActivities([...activities, aktivnost]);
				setSelektiran(aktivnost);
				setEditMode(false);
				setSnimanje(false);
			});
		}

		// if (aktivnost.id !== '') {
		// 	setActivities([
		// 		...activities.filter(data => {
		// 			return data.id !== aktivnost.id;
		// 		}),
		// 		aktivnost,
		// 	]);
		// } else {
		// 	setActivities([...activities, { ...aktivnost, id: +new Date() }]);
		// }

		// zatvori prozor
		// setEditMode(false);
	}

	function handleDeleteActivity(id) {
		setSnimanje(true);
		Servisi.obrisi(id).then(() => {
			setActivities([
				...activities.filter(data => {
					return data.id !== id;
				}),
			]);
			setSnimanje(false);
		});
	}

	if (loading) return <LoadingData content="Loading data...." />;

	return (
		<Fragment>
			<NavBar openForm={handleFormOpen} />
			<Container style={{ marginTop: '100px' }}>
				<ActivityDashboard
					activities={activities}
					selektiran={selektiran}
					selectActivity={handleSelectActivity}
					canceledSelectActivity={handleCanceledSelectActivity}
					editMode={editMode}
					openForm={handleFormOpen}
					closeForm={handleFormClose}
					createOrEditActivity={handleCreateOrEditActivity}
					deleteActivity={handleDeleteActivity}
					snimanje={snimanje}
				/>
			</Container>
		</Fragment>
	);
}

export default App;
