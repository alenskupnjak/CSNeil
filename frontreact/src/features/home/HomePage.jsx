import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

function HomePage(params) {
	return (
		<Container style={{ marginTop: '7em' }}>
			<h1>Home page</h1>
			<h3>
				Go to <Link to="/aktivni">Idi na Manu</Link>
			</h3>
		</Container>
	);
}

export default HomePage;
