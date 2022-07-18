import { Fragment, React } from 'react';
import { observer } from 'mobx-react-lite';
import { Header, Item, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ActivityListItem from './ActivityListItem';
import ActivityListItemStaro from './ActivityListItemStaro';

function ActivityList(props) {
	const { activityStore } = useStore();
	const { activities } = activityStore;
	console.log('%c activities= ', 'color:blue', activities);

	return (
		<Fragment>
			{activities &&
				activities.map(({ date, data }) => {
					return (
						<div key={date}>
							<Header sub color="teal">
								{date}
							</Header>
							{data &&
								data.map((item, index) => {
									return <ActivityListItem key={item.id} item={item} index={index} />;
								})}
						</div>
					);
				})}
			{activities &&
				activities.map(({ date, data }) => {
					return (
						<div key={date}>
							<Header sub color="teal">
								{date}
							</Header>
							<Segment>
								<Item.Group divided>
									{data &&
										data.map((item, index) => {
											return <ActivityListItemStaro key={item.id} item={item} index={index} />;
										})}
								</Item.Group>
							</Segment>
						</div>
					);
				})}
		</Fragment>
	);
}

export default observer(ActivityList);
