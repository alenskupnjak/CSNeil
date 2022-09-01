import { makeAutoObservable, runInAction } from 'mobx';
import { history } from '../..';
import agent from '../api/agent';
import { store } from './store';

export default class UserStore {
	user = null;

	constructor() {
		makeAutoObservable(this);
	}

	get isLoggedIn() {
		return !!this.user;
	}

	login = async creds => {
		try {
			const user = await agent.Account.login(creds);
			store.commonStore.setToken(user.token);
			runInAction(() => {
				this.user = user;
			});
			history.push('/aktivni');
			store.modalStore.closeModal();
		} catch (error) {
			throw error;
		}
	};

	logout = () => {
		store.commonStore.setToken(null);
		window.localStorage.removeItem('jwt');
		this.user = null;
		history.push('/');
	};

	getUser = async () => {
		try {
			const user = await agent.Account.current();
			runInAction(() => (this.user = user));
		} catch (error) {
			console.log(error);
		}
	};

	pokus = async () => {
		try {
			console.log('%c Poruka dolazi iz UserStore!!', 'color:blue');
		} catch (error) {
			console.log(error);
		}
	};

	register = async creds => {
		try {
			const user = await agent.Account.register(creds);
			store.commonStore.setToken(user.token);
			runInAction(() => (this.user = user));
			history.push('/aktivni');
			store.modalStore.closeModal();
		} catch (error) {
			throw error;
		}
	};
}