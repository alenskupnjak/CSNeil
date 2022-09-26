import React from 'react';
import Calendar from 'react-calendar';
import { Header, Menu } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';

function ActivityFilters() {
	return (
		<React.Fragment>
			<Menu vertical size="large" style={{ width: '100%', marginTop: '26px' }}>
				<Header icon="filter" attached color="teal" content="Filters" />
				<Menu.Item content="All Activites" />
				<Menu.Item content="I'm going" />
				<Menu.Item content="I'm hosting" />
			</Menu>
			<Header />
			<Calendar />
		</React.Fragment>
	);
}

export default observer(ActivityFilters);
