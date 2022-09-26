import { makeAutoObservable, runInAction, reaction } from 'mobx';
import agent from '../api/agent';
import { store } from './store';
import { history } from '../..';

export default class ProfileStore {
	profile = null;
	loadingProfile = false;
	uploading = false;
	loading = false;
	followings = [];
	loadingFollowings = false;
	activeTab = 0;

	constructor() {
		makeAutoObservable(this);
		reaction(
			() => this.activeTab,
			activeTab => {
				if (activeTab === 3 || activeTab === 4) {
					const predicate = activeTab === 3 ? 'followers' : 'following';
					this.loadFollowings(predicate);
				} else {
					this.followings = [];
				}
			}
		);
	}

	setActiveTab = activeTab => {
		this.activeTab = activeTab;
	};

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
				this.profile = profile.data;
				// <Route path="/profiles/:username" component={ProfilePage} />
				// this.activeTab = 3;
				// history.push(`/profiles/${username}`);
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

	updateFollowing = async (username, following) => {
		this.loading = true;
		try {
			await agent.Profiles.updateFollowing(username);
			// store.activityStore.updateAttendeeFollowing(username);
			store.activityStore.loadActivities();
			this.loadProfile(username);
			// runInAction(() => {
			// 	if (
			// 		this.profile &&
			// 		this.profile.username !== store.userStore.user?.username &&
			// 		this.profile.username === username
			// 	) {
			// 		following ? this.profile.followersCount++ : this.profile.followersCount--;
			// 		this.profile.following = !this.profile.following;
			// 	}
			// 	if (this.profile && this.profile.username === store.userStore.user?.username) {
			// 		following ? this.profile.followingCount++ : this.profile.followingCount--;
			// 	}
			// 	this.followings.forEach(profile => {
			// 		if (profile.username === username) {
			// 			profile.following ? profile.followersCount-- : profile.followersCount++;
			// 			profile.following = !profile.following;
			// 		}
			// 	});
			// });
			this.loading = false;
		} catch (error) {
			console.log(error);
			runInAction(() => (this.loading = false));
		}
	};

	// usnimavanje podataka
	loadFollowings = async predicate => {
		this.loadingFollowings = true;
		try {
			const followings = await agent.Profiles.listFollowings(this.profile.username, predicate);
			runInAction(() => {
				this.followings = followings.data;
				this.loadingFollowings = false;
			});
		} catch (error) {
			runInAction(() => (this.loadingFollowings = false));
		}
	};
}
