import React from 'react';
import { observer } from 'mobx-react-lite';
import { useEffect, useState, Fragment } from 'react';
import { Button, Container } from 'semantic-ui-react';
import NavBar from './app/layout/NavBar';
import ActivityDashboard from './features/activities/dashboard/ActivityDashborad';
import Servisi from './app/api/Servisi';
import LoadingData from './app/layout/LoadingData';
import { v4 as uuid } from 'uuid';
import { useStore } from './app/stores/store';

function App() {
	const { activityStore } = useStore();

	console.log('%c activityStore= ', 'color:green', activityStore);

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

	if (loading) return <LoadingData content="Loading data..ddd.." />;

	return (
		<Fragment>
			<NavBar openForm={handleFormOpen} />
			<Container style={{ marginTop: '100px' }}>
				<h2>{activityStore.title}</h2>
				<Button content="Ajmoo" positive onClick={activityStore.setTitle} />
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

export default observer(App);
