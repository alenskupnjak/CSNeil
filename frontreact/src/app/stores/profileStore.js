import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { store } from './store';

export default class ProfileStore {
	profile = null;
	loadingProfile = false;
	uploading = false;
	loading = false;

	constructor() {
		makeAutoObservable(this);
		console.log('%c 00', 'color:green', this);

		console.log('%c 00 BOOM', 'color:red');
	}

	get isCurrentUser() {
		if (store.userStore.user && this.profile) {
			return store.userStore.user.username === this.profile.username;
		}
		return false;
	}

	// LOAD LOAD LOAD
	loadProfile = async username => {
		this.loadingProfile = true;
		try {
			const profile = await agent.Profiles.get(username);
			runInAction(() => {
				this.profile = profile;
				this.loadingProfile = false;
			});
		} catch (error) {
			console.log(error);
			runInAction(() => (this.loadingProfile = false));
		}
	};

	// Usnimavanje slike
	uploadPhoto = async file => {
		this.uploading = true;
		try {
			const response = await agent.Profiles.uploadPhoto(file);
			const photo = response.data;
			runInAction(() => {
				if (this.profile) {
					this.profile.photos?.push(photo);
					if (photo.isMain && store.userStore.user) {
						store.userStore.setImage(photo.url);
						this.profile.image = photo.url;
					}
				}
				this.uploading = false;
			});
		} catch (err) {
			console.log('%c uploadPhoto ERROR', 'color:red', err);
			runInAction(() => (this.uploading = false));
		}
	};

	// SET-MAIN SET-MAIN SET-MAIN SET-MAIN SET-MAIN
	setMainPhoto = async photo => {
		this.loading = true;
		try {
			await agent.Profiles.setMainPhoto(photo.id);
			store.userStore.setImage(photo.url);
			runInAction(() => {
				if (this.profile && this.profile.photos) {
					// staroj slici u memoriji setiraj na false
					this.profile.photos.find(p => p.isMain).isMain = false;
					// novoj slici setiraj na glavnu
					this.profile.photos.find(p => p.id === photo.id).isMain = true;
					this.profile.image = photo.url;
					this.loading = false;
				}
			});
		} catch (err) {
			console.log('%c setMainPhoto =', 'color:red', err);
			runInAction(() => (this.loading = false));
		}
	};

	// DELETE DELETE DELETE DELETE
	deletePhoto = async photo => {
		this.loading = true;
		try {
			await agent.Profiles.deletePhoto(photo.id);
			runInAction(() => {
				if (this.profile) {
					this.profile.photos = this.profile.photos?.filter(p => p.id !== photo.id);
					this.loading = false;
				}
			});
		} catch (error) {
			runInAction(() => (this.loading = false));
			console.log(error);
		}
	};

	updateProfile = async profile => {
		this.loading = true;
		try {
			await agent.Profiles.updateProfile(profile);
			runInAction(() => {
				if (profile.displayName && profile.displayName !== store.userStore.user?.displayName) {
					store.userStore.setDisplayName(profile.displayName);
				}
				this.profile = { ...this.profile, ...profile };
				this.loading = false;
			});
		} catch (error) {
			console.log(error);
			runInAction(() => (this.loading = false));
		}
	};
}
