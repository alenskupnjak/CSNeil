import { makeAutoObservable, reaction } from 'mobx';
import UserStore from './userStore';

export default class CommonStore {
	error = null;
	token = window.localStorage.getItem('jwt');
	appLoaded = false;

	constructor() {
		makeAutoObservable(this);
		console.log('%c *** constructor CommonStore ***', 'color:green', this.token);

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
	}

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
