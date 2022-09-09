import { makeAutoObservable, observable, runInAction } from 'mobx';
import agent from '../api/agent';
import { v4 as uuid } from 'uuid';
import _ from 'lodash';
import { store } from './store';

export default class ActivityStore {
	activities = [];
	selektiran = null; // selectedActivity
	editMode = false;
	loading = false;
	loadingInitial = false;

	constructor() {
		console.log('%c *** A constructor ActivityStore ***', 'color:green', this.token);
		makeAutoObservable(this);
	}

	//  Usnimavanje svih dogadaja, ne iz memorije kako je autor radio
	loadActivities = async () => {
		this.activities = [];
		try {
			this.loading = true;
			const response = await agent.Servisi.listSvih();

			// console.log('%c 01 activities', 'color:red', activities);

			runInAction(() => {
				this.activities = _.sortBy(response, ['date']);
				this.activities = _.chain(this.activities)
					// Group the elements of Array based on `date` property
					.groupBy('date')
					// `key` is group's name (date), `value` is the array of objects
					.map((value, key) => ({ date: key, podaci: value }))
					.value();

				this.activities.map(item => {
					// Ovo je zbog grupiranja ovakav format
					item.date = item.date.split('T')[0];
					return item;
				});
				const user = store.userStore.user;
				console.log('%c user ', 'color:red', user);

				this.activities.forEach(data => {
					if (user) {
						data.podaci[0].isGoing = data.podaci[0]?.attendees.some(a => a.username === user.username);
						data.podaci[0].isHost = data.podaci[0]?.hostUsername === user.username;
						data.podaci[0].host = data.podaci[0]?.attendees?.find(x => x.username === data.podaci[0].hostUsername);
					}
					return data;
				});
				console.log('%c 033  Usnimavanje svih dogadaja ', 'color:green', this.activities);
			});
		} catch (err) {
			console.log('%c Greška u activityStore ', 'color:red', err);
			runInAction(() => {});
		} finally {
			// await new Promise(r => setTimeout(r, 2000));
			this.loading = false;
		}
	};

	//
	// Usnimavanje jednog itema
	loadActivity = async id => {
		this.selektiran = null;
		this.loadingInitial = true;
		try {
			const activity = await agent.Servisi.listaJednog(id);
			console.log('%c activity ', 'color:gold', activity);

			runInAction(() => {
				activity.date = activity.date.split('T')[0];
				// Povlacim logiranog usera
				const user = store.userStore.user;
				if (user) {
					activity.isGoing = activity.attendees.some(a => a.username === user.username);
					activity.isHost = activity.hostUsername === user.username;
					activity.host = activity.attendees?.find(x => x.username === activity.hostUsername);
				}

				// activity.date = new Date(activity.date);
				this.selektiran = activity;
				console.log('%c 034 loadActivity usnimljen jedan item', 'color:green', this.selektiran);
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
		delete aktivnost.attendees;

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

	// Ikljucuje/iskljucije prisutnost dogaraju
	updateAttendance = async () => {
		console.log('%c 00 this.selektiran', 'color:green', this.selektiran);
		const user = store.userStore.user;
		this.loading = true;
		try {
			await agent.Servisi.attend(this.selektiran.id);
			runInAction(() => {
				if (this.selektiran?.isGoing) {
					this.selektiran.attendees = this.selektiran.attendees?.filter(a => a.username !== user?.username);
					this.selektiran.isGoing = false;
				} else {
					// const attendee = new Profile(user);
					this.selektiran?.attendees.push(user);
					this.selektiran.isGoing = true;
				}
				// this.activityRegistry.set(this.selektiran.id, this.selektiran)
			});
		} catch (error) {
			console.log(error);
		} finally {
			runInAction(() => (this.loading = false));
		}
	};
}
