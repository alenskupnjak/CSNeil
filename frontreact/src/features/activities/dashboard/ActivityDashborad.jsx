import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Grid, Loader } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import { useStore } from '../../../app/stores/store';
import LoadingData from '../../../app/layout/LoadingData';
import ActivityFilters from './ActivityFilters';
import InfiniteScroll from 'react-infinite-scroller';
import ActivityListItemPlaceholder from './ActivityListItemPlaceholder';

function ActivityDashboard(props) {
	const { activityStore, userStore } = useStore();
	const { loadActivities, setPagingParams, pagingParams, loadingInitial } = activityStore;
	const [loadingNext, setLoadingNext] = useState(false);

	function handleGetNext(smjer) {
		setLoadingNext(true);
		console.log('%c  PRVO handleGetNext ', 'color:green', pagingParams);

		// setPagingParams(new PagingParams(pagination.currentPage + 1));
		// pagingParams.pageSize = pagingParams.pageSize + 1;
		setPagingParams(pagingParams);
		console.log('%c TOTO ', 'color:red', { ...pagingParams, currentPage: pagingParams.currentPage + 1 });

		setPagingParams({
			...pagingParams,
			pageSize: pagingParams.itemsPerPage * (pagingParams.currentPage + smjer),
			currentPage: pagingParams.currentPage + smjer,
		});
		loadActivities().then(() => setLoadingNext(false));
	}

	useEffect(() => {
		setPagingParams({
			...pagingParams,
			pageSize: 3,
			currentPage: 1,
		});
		// if (userStore.isLoggedIn) {
		loadActivities();
		// }
	}, []);

	// if (activityStore.loading) return <LoadingData content="Loading data list...." />;

	return (
		<Grid>
			<Grid.Column width="10">
				{loadingInitial && !loadingNext ? (
					<React.Fragment>
						<ActivityListItemPlaceholder />
					</React.Fragment>
				) : (
					<InfiniteScroll
						pageStart={0}
						loadMore={handleGetNext}
						hasMore={!loadingNext && !!pagingParams && pagingParams.currentPage < pagingParams.totalPages}
						initialLoad={false}
					>
						<ActivityList />
					</InfiniteScroll>
				)}
			</Grid.Column>
			<Grid.Column width="6">{<ActivityFilters />}</Grid.Column>
			{/* <Grid.Column width={10}>
				<Loader active={loadingNext} />
			</Grid.Column> */}
		</Grid>
	);
}

export default observer(ActivityDashboard);

// {/* )} */}
// {/* <ActivityList /> */}
// {/* <Button
// 	floated="right"
// 	content="Next..."
// 	positive
// 	onClick={() => handleGetNext(1)}
// 	disabled={pagingParams.pageSize > pagingParams.totalItems}
// />
// <Button
// 	floated="right"
// 	content="Prev..."
// 	positive
// 	onClick={() => handleGetNext(-1)}
// 	disabled={pagingParams.itemsPerPage === pagingParams.pageSize}
// /> */}
