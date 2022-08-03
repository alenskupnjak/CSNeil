import { makeAutoObservable, observable, runInAction } from 'mobx';
import agent from '../api/agent';
import { v4 as uuid } from 'uuid';
import _ from 'lodash';

export default class ActivityStore {
	activities = [];
	selektiran = null; // selectedActivity
	editMode = false;
	loading = false;
	loadingInitial = false;

	constructor() {
		makeAutoObservable(this);
	}

	//  Usnimavanje svih dogadaja, ne iz memorije kako je autor radio
	loadActivities = async () => {
		this.activities = [];
		this.loading = true;
		try {
			let activities = await agent.Servisi.listSvih();

			activities = _.sortBy(activities, ['date']);

			activities = _.chain(activities)
				// Group the elements of Array based on `date` property
				.groupBy('date')
				// `key` is group's name (date), `value` is the array of objects
				.map((value, key) => ({ date: key, data: value }))
				.value();

			runInAction(() => {
				activities.forEach(item => {
					// Ovo je zbog grupiranja ovakav format
					item.date = item.date.split('T')[0];
					this.activities.push(item);
				});
			});
		} catch (err) {
			console.log('%c err ', 'color:red', err);
			runInAction(() => {});
		} finally {
			// await new Promise(r => setTimeout(r, 2000));
			this.loading = false;
		}
	};

	// Usnimavanje jednog itema
	loadActivity = async id => {
		console.log('%c Id Create ', 'color:green', id);
		this.loadingInitial = true;
		try {
			const activity = await agent.Servisi.listaJednog(id);
			runInAction(() => {
				activity.date = activity.date.split('T')[0];
				// activity.date = new Date(activity.date);
				this.selektiran = activity;
			});
		} catch (err) {
			console.log('%c error ', 'color:red', err);
		} finally {
			this.loadingInitial = false;
		}
	};

	// Ovo sve ce zamjeniti router
	// selectActivity = id => {
	// 	this.selektiran = this.activities.find(data => data.id === id);
	// };

	// cancelSelectedActivity = () => {
	// 	this.selektiran = null;
	// };

	// openForm = id => {
	// 	id ? this.selectActivity(id) : this.cancelSelectedActivity();
	// 	this.editMode = true;
	// };

	// closeForm = () => {
	// 	this.editMode = false;
	// };

	createActivity = async aktivnost => {
		aktivnost.id = uuid();
		this.loading = true;
		console.log('%c CREATE', 'color:red', aktivnost);

		try {
			await agent.Servisi.kreiraj(aktivnost);
			runInAction(() => {
				// this.activities.push(aktivnost);
				this.selektiran = null;
				this.loading = false;
				this.editMode = false;
			});
		} catch (err) {
			this.loading = false;
			console.log('%c err Create  ', 'color:red', err);
		}
	};

	updateActivity = async aktivnost => {
		console.log('%c UPDATE', 'color:green', aktivnost);

		this.loading = true;
		try {
			await agent.Servisi.update(aktivnost);
			runInAction(() => {
				this.activities = _.filter(this.activities, data => {
					return data.id !== aktivnost.id;
				});
				this.activities.push(aktivnost);
				this.activities = _.sortBy(this.activities, ['date']);
				this.selektiran = aktivnost;
				this.loading = false;
				this.editMode = false;
			});
		} catch (err) {
			this.loading = false;
			console.log('%c err ', 'color:red', err);
		}
	};

	deleteActivity = async id => {
		this.loading = true;
		try {
			await agent.Servisi.obrisi(id);
			runInAction(() => {
				this.activities = _.filter(this.activities, data => {
					return data.id !== id;
				});
				// this.cancelSelectedActivity();
				this.loading = false;
				this.editMode = false;
			});
		} catch (err) {
			console.log('%c err ', 'color:red', err);
		}
	};
}
