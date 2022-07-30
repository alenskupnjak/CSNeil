import { makeAutoObservable } from 'mobx';

export default class CommonStore {
	error = null;
	constructor() {
		makeAutoObservable(this);
	}

	setServerError = error => {
		this.error = error;
	};
}
