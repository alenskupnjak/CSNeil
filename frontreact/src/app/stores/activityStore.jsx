import { makeObservable, observable } from 'mobx';

export default class ActivityStore {
	title = 'evo me - 88t8  iiii  ddxxxxddd  ';
	constructor() {
		makeObservable(this, {
			title: observable,
		});
	}

	setTitle = () => {
		this.title = this.title + '!!Ixxx ooo';
	};
}
