import { makeAutoObservable, observable, runInAction, _allowStateReadsStart } from 'mobx';
import Servisi from '../api/Servisi';
import { v4 as uuid } from 'uuid';
import _ from 'lodash';

export default class ActivityStore {
	activities = [];
	selektiran = null; // selectedActivity
	editMode = false;
	loading = true;
	snimanje = false; //loadinginitial

	constructor() {
		makeAutoObservable(this);
	}

	//  Usnimavanje svih dogadaja
	loadActivities = async () => {
		this.loading = true;
		try {
			let activities = await Servisi.listSvih();
			activities = _.sortBy(activities, ['date']);
			runInAction(() => {
				activities.forEach(item => {
					item.date = item.date.split('T')[0];
					this.activities.push(item);

					this.loading = false;
				});
			});
		} catch (err) {
			console.log('%c err ', 'color:red', err);
			runInAction(() => {
				this.loading = false;
			});
		}
	};

	selectActivity = id => {
		this.selektiran = this.activities.find(data => data.id === id);
	};

	cancelSelectedActivity = () => {
		this.selektiran = null;
	};

	openForm = id => {
		id ? this.selectActivity(id) : this.cancelSelectedActivity();
		this.editMode = true;
	};

	closeForm = () => {
		this.editMode = false;
	};

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
			console.log('%c err ', 'color:red', err);
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
				this.cancelSelectedActivity();
				this.loading = false;
				this.editMode = false;
			});
		} catch (err) {
			console.log('%c err ', 'color:red', err);
		}
	};
}
