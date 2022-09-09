import { makeAutoObservable, runInAction } from 'mobx';
import { history } from '../..';
import agent from '../api/agent';
import { store } from './store';

export default class UserStore {
	user = null;
	logiraniUser = window.localStorage.getItem('logiraniUser');

	constructor() {
		console.log('%c *** AAA constructor UserStore ***', 'color:red', this.user);
		makeAutoObservable(this);
		if (this.logiraniUser) {
			this.login({ email: this.logiraniUser, password: 'Pa$$w0rd' });
		}
	}

	get isLoggedIn() {
		return !!this.user;
	}

	login = async creds => {
		console.log('%c 036 LOGIN', 'color:green', creds);
		try {
			const user = await agent.Account.login(creds);
			store.commonStore.setToken(user.token);
			window.localStorage.setItem('logiraniUser', creds.email);
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
			window.localStorage.setItem('logiraniUser', user.username);
			runInAction(() => (this.user = user));
			history.push('/aktivni');
			store.modalStore.closeModal();
		} catch (error) {
			throw error;
		}
	};
}
