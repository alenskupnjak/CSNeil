import { Fragment, React } from 'react';
import { observer } from 'mobx-react-lite';
import { Header, Item, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ActivityListItem from './ActivityListItem';
// import ActivityListItemStaro from './ActivityListItemStaro';
import { v4 as uuid } from 'uuid';

function ActivityList(props) {
	const { activityStore } = useStore();
	const { activities } = activityStore;

	return (
		<Fragment>
			{activities &&
				activities.map(({ date, podaci }) => {
					return (
						<div key={uuid()}>
							<Header sub color="teal">
								Datum:{date}
							</Header>
							{podaci &&
								podaci.map((item, index) => {
									return <ActivityListItem key={index} item={item} index={index} />;
								})}
						</div>
					);
				})}
		</Fragment>
	);
}

export default observer(ActivityList);
