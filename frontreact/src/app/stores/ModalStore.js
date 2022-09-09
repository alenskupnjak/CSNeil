import { makeAutoObservable } from 'mobx';

export default class ModalStore {
	modal = {
		open: false,
		body: null,
	};

	constructor() {
		console.log('%c *** AAAA constructor CommonStore ***', 'color:green');
		makeAutoObservable(this);
	}

	openModal = content => {
		this.modal.open = true;
		this.modal.body = content;
	};

	closeModal = () => {
		this.modal.open = false;
		this.modal.body = null;
	};
}
