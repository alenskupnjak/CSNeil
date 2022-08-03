import { Fragment, React } from 'react';
import { observer } from 'mobx-react-lite';
import { Header, Item, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ActivityListItem from './ActivityListItem';
import ActivityListItemStaro from './ActivityListItemStaro';
import { v4 as uuid } from 'uuid';

function ActivityList(props) {
	const { activityStore } = useStore();
	const { activities } = activityStore;

	return (
		<Fragment>
			{activities &&
				activities.map(({ date, data }) => {
					return (
						<div key={uuid()}>
							<Header sub color="teal">
								{date}
							</Header>
							{data &&
								data.map((item, index) => {
									return <ActivityListItem key={index} item={item} index={index} />;
								})}
						</div>
					);
				})}
			{/* {activities &&
				activities.map(({ date, data }) => {
					return (
						<div key={uuid()}>
							<Header sub color="teal">
								{date}
							</Header>
							<Segment>
								<Item.Group divided>
									{data &&
										data.map((item, index) => {
											return <ActivityListItemStaro key={index} item={item} index={index} />;
										})}
								</Item.Group>
							</Segment>
						</div>
					);
				})} */}
		</Fragment>
	);
}

export default observer(ActivityList);
