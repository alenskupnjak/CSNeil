import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { makeAutoObservable, runInAction } from 'mobx';
import { store } from './store';

export default class CommentStore {
	comments = [];
	hubConnection = null;

	constructor() {
		makeAutoObservable(this);
	}

	createHubConnection = activityId => {
		if (store.activityStore.selektiran) {
			this.hubConnection = new HubConnectionBuilder()
				.withUrl('http://localhost:5017/chat?activityId=' + activityId, {
					accessTokenFactory: () => store.userStore.user?.token,
				})
				.withAutomaticReconnect()
				.configureLogging(LogLevel.Information)
				.build();

			this.hubConnection.start().catch(error => console.log('Error establishing the connection: ', error));
			this.hubConnection.on('LoadComments', comments => {
				console.log('%c 01 hubConnection LoadComments =', 'color:red', comments);
				runInAction(() => {
					comments.forEach(comment => {
						comment.createdAt = new Date(comment.createdAt + 'Z');
					});
					this.comments = comments;
					console.log('%c 02 hubConnection LoadComments =', 'color:red', this.comments);
				});
			});
			this.hubConnection.on('ReceiveComment', comment => {
				console.log('%c hubConnection ReceiveComment =', 'color:blue', comment);
				runInAction(() => {
					comment.createdAt = new Date(comment.createdAt);
					this.comments.unshift(comment);
				});
			});
		}
	};

	stopHubConnection = () => {
		this.hubConnection?.stop().catch(error => console.log('Error stopping connection: ', error));
	};

	clearComments = () => {
		this.comments = [];
		this.stopHubConnection();
	};

	addComment = async values => {
		values.activityId = store.activityStore.selektiran?.id;
		try {
			// ime  'SendComment' je važno i mora tpčno odgovarati tome na backendu
			//  API.SignalR.ChatHub ->   public async Task ***SendComment*** (Create.Command command)
			await this.hubConnection?.invoke('SendComment', values);
		} catch (error) {
			console.log(error);
		}
	};
}
