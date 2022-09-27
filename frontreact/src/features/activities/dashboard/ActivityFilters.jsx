import React from 'react';
import Calendar from 'react-calendar';
import { Header, Menu } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';

function ActivityFilters() {
	const {
		activityStore: { predicate, setPredicate },
	} = useStore();
	const d = new Date('January 14, 2012');
	console.log('%c 000000000000000000 ', 'color:green', predicate.startDate);

	return (
		<React.Fragment>
			<Menu vertical size="large" style={{ width: '100%', marginTop: 25 }}>
				<Header icon="filter" attached color="teal" content="Filters" />
				<Menu.Item content="All Activites" active={predicate.all} onClick={() => setPredicate('all', 'true')} />
				<Menu.Item content="I'm going" active={predicate.isGoing} onClick={() => setPredicate('isGoing', 'true')} />
				<Menu.Item content="I'm hosting" active={predicate.isHost} onClick={() => setPredicate('isHost', 'true')} />
			</Menu>
			<Header />
			<Calendar
				onChange={date => setPredicate('startDate', date)}
				value={predicate.startDate || d.setMonth(d.getMonth() - 3)}
			/>
		</React.Fragment>
	);
}

export default observer(ActivityFilters);
