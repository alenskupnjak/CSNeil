import { makeAutoObservable, reaction } from 'mobx';
import UserStore from './userStore';

export default class CommonStore {
	error = null;
	token = window.localStorage.getItem('jwt');
	appLoaded = false;

	constructor() {
		makeAutoObservable(this);
		console.log('%c *** AA constructor CommonStore ***', 'color:red');

		reaction(
			() => this.token,
			token => {
				if (token) {
					window.localStorage.setItem('jwt', token);
				} else {
					window.localStorage.removeItem('jwt');
				}
			}
		);
		this.noviUserstore = new UserStore();
		this.init();
	}

	init = async () => {
		if (this.token) {
			// this.noviUserstore.getUser().finally(() => this.setAppLoaded());
			await this.noviUserstore.getUser();
			this.setAppLoaded();
		} else {
			this.setAppLoaded();
		}
		this.noviUserstore.pokus();
		// history.push('/');
	};

	setServerError = error => {
		this.error = error;
	};

	setToken = token => {
		this.token = token;
	};

	setAppLoaded = () => {
		this.appLoaded = true;
	};
}
