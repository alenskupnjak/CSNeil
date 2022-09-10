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
		console.log('%c *** A constructor ActivityStore ***', 'color:red', this.token);
		makeAutoObservable(this);
	}

	handleSubmitFormik = (values, history) => {
		console.log('%c 043 CREATE createActivity activity ', 'background: #8d6e63; color: #242333', values);
		if (values.id) {
			this.updateActivity(values);
			history.push(`/aktivni/${values.id}`);
		} else {
			this.createActivity(values);
			history.push(`/aktivni`);
		}
	};

	//  Usnimavanje svih dogadaja, ne iz memorije kako je autor radio
	loadActivities = async () => {
		try {
			this.activities = [];
			this.loading = true;
			const response = await agent.Servisi.listSvih();
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
		try {
			this.selektiran = null;
			this.loadingInitial = true;
			const activity = await agent.Servisi.listaJednog(id);
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
				console.log('%c 034 loadActivity usnimljen 1 item', 'color:green', this.selektiran);
			});
		} catch (err) {
			console.log('%c error ', 'color:red', err);
		} finally {
			this.loadingInitial = false;
		}
	};

	// CREATE CREATE CREATE CREATE CREATE
	createActivity = async aktivnost => {
		console.log('%c 038 CREATE createActivity activity ', 'background: #8d6e63; color: #242333', aktivnost);
		try {
			aktivnost.id = uuid();
			this.loading = true;
			await agent.Servisi.kreiraj(aktivnost);
			runInAction(() => {
				this.loadActivities();
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
		console.log('%c 039 UPDATE createActivity activity ', 'background: #8d6e63; color: #242333', aktivnost);
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

	// DELETE DELETE DELETE DELETE
	deleteActivity = async id => {
		console.log('%c 041 DELETE  ', 'background: #8d6e63; color: #242333', id);
		this.loading = true;
		try {
			await agent.Servisi.obrisi(id);
			runInAction(() => {
				this.loadActivities();
				// this.cancelSelectedActivity();
				this.loading = false;
				this.editMode = false;
			});
		} catch (err) {
			console.log('%c err ', 'color:red', err);
		}
	};

	// Iskljucuje/iskljucije prisutnost dogaraju
	updateAttendance = async () => {
		console.log('%c 040 UPDATE updateAttendance ', 'background: #8d6e63; color: #242333', this.selektiran);
		const user = store.userStore.user;
		this.loading = true;
		try {
			await agent.Servisi.attend(this.selektiran.id);
			runInAction(() => {
				if (this.selektiran?.isGoing) {
					this.selektiran.attendees = this.selektiran.attendees?.filter(a => a.username !== user?.username);
					this.selektiran.isGoing = false;
				} else {
					this.selektiran?.attendees.push(user);
					this.selektiran.isGoing = true;
				}
			});
		} catch (error) {
			console.log(error);
		} finally {
			runInAction(() => (this.loading = false));
		}
	};

	cancelActivityToggle = async () => {
		console.log('%c 045 CANCEL updateAttendance ', 'background: #8d6e63; color: #242333', this.selektiran);
		this.loading = true;
		try {
			await agent.Servisi.attend(this.selektiran.id);
			runInAction(() => {
				this.selektiran.isCancelled = !this.selektiran.isCancelled;
			});
		} catch (error) {
			console.log(error);
		} finally {
			runInAction(() => (this.loading = false));
		}
	};
}

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
