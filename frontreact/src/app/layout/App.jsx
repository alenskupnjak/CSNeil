import axios from 'axios';
import { useEffect, useState } from 'react';
import { List } from 'semantic-ui-react';
import NavBar from './NavBar';

function App() {
	const [activities, setActivities] = useState([]);

	console.log('%c activities= ', 'color:green', activities);

	useEffect(() => {
		axios.get('http://localhost:5000/api/ActivitiesTable').then(res => {
			console.log('%c 00 ', 'color:green', res);

			setActivities(res.data);
		});
	}, []);

	return (
		<div>
			<NavBar />
			<List>
				{activities.map(data => (
					<List.Item>{data.title}</List.Item>
				))}
			</List>
		</div>
	);
}

export default App;