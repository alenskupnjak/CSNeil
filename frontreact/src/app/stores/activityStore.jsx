import { makeAutoObservable, observable, runInAction } from 'mobx';
import Servisi from '../api/Servisi';
import { v4 as uuid } from 'uuid';
import _ from 'lodash';

export default class ActivityStore {
	activities = [];
	selektiran = null; // selectedActivity
	editMode = false;
	loading = true;
	loadingInitial = false;

	constructor() {
		makeAutoObservable(this);
	}

	//  Usnimavanje svih dogadaja, ne iz memorije kako je autor radio
	loadActivities = async () => {
		this.activities = [];
		this.loading = true;
		try {
			let activities = await Servisi.listSvih();

			activities = _.sortBy(activities, ['date']);

			activities = _.chain(activities)
				// Group the elements of Array based on `date` property
				.groupBy('date')
				// `key` is group's name (date), `value` is the array of objects
				.map((value, key) => ({ date: key, data: value }))
				.value();

			runInAction(() => {
				activities.forEach(item => {
					item.date = item.date.split('T')[0];
					this.activities.push(item);
				});
			});
		} catch (err) {
			console.log('%c err ', 'color:red', err);
			runInAction(() => {});
		} finally {
			this.loading = false;
		}
	};

	// Usnimavanje jednog itema
	loadActivity = async id => {
		console.log('%c Id Create ', 'color:green', id);
		this.loadingInitial = true;
		try {
			const activity = await Servisi.listaJednog(id);
			runInAction(() => {
				activity.date = activity.date.split('T')[0];
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
		try {
			await Servisi.kreiraj(aktivnost);
			runInAction(() => {
				this.activities.push(aktivnost);
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
		this.loading = true;
		try {
			await Servisi.update(aktivnost);
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
			await Servisi.obrisi(id);
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
