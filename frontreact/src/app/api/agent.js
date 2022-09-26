import axios from 'axios';
import { toast } from 'react-toastify';
import { history } from '../..';
import { store } from '../stores/store';
import { CONST } from './constants';

// axios.defaults.baseURL = 'http://localhost:5017/api';
axios.defaults.baseURL = CONST.backendURL;
// Imitacija requesta
const sleep = delay => {
	return new Promise(res => {
		setTimeout(res, delay);
	});
};

// Imitacija rada
axios.interceptors.response.use(
	async res => {
		const pagination = res.headers['pagination'] && JSON.parse(res.headers['pagination']);
		if (pagination) {
			res.currentPage = pagination.currentPage;
			res.itemsPerPage = 3;
			res.totalItems = pagination.totalItems;
			res.totalPages = pagination.totalPages;
		}

		// await sleep(100);
		return res;
	},
	err => {
		console.log('%c 026 interceptors data=', 'color:green', err.response);
		const { data, status, config } = err.response;
		console.log('%c 026A interceptors data=', 'color:green', data);
		console.log('%c 026AA interceptors status=', 'color:green', status);
		console.log('%c 026AAA interceptors config=', 'color:green', config);

		switch (status) {
			case 400:
				if (config.method === 'get' && data?.errors?.hasOwnProperty('id')) {
					console.log('%c 025', 'color:blue', config.method, data?.errors?.hasOwnProperty('id'));
					history.push('/not-found');
				}
				if (data.errors) {
					console.log('%c 022 Greska 400 ', 'color:green', data.errors);
					const modalStateErrors = [];
					for (const key in data.errors) {
						if (data.errors[key]) {
							modalStateErrors.push(data.errors[key]);
						}
					}
					console.log('%c 020 Greska 400 ', 'color:green', modalStateErrors);
					console.log('%c 021 Greska 400a ', 'color:green', modalStateErrors.flat());
					throw modalStateErrors.flat();
				} else {
					toast.error(data);
				}
				break;
			case 401:
				toast.error(' 031 Neautoriziran');
				break;
			case 404:
				history.push('/not-found');
				toast.error('025 Nisam naso ');
				break;
			case 500:
				store.commonStore.setServerError(data);
				history.push('/server-error');
				toast.error('Server 500 neki greska');
				break;

			default:
				break;
		}

		return Promise.reject(err);
	}
);

axios.interceptors.request.use(config => {
	const token = store.commonStore.token;
	if (token) config.headers.Authorization = `Bearer ${token}`;
	console.log('%c 032 TOKEN podesen config interceptors=', 'color:gold', config);
	return config;
});

// presretac poruka
axios.interceptors.response.use(async res => {
	try {
		console.log('%c 037 Interceptors ', 'color:gold', res);
		// await sleep(100);
		return res;
	} catch (error) {
		console.log('%c Greska ', 'color:red', error);
		return await Promise.reject(error);
	}
});

const request = {
	// Ovdje nije dobro stavljati catch jer onda ne mozes loviti greske okolo u app
	get: url => axios.get(url).then(res => res),
	post: (url, body) => axios.post(url, body).then(res => res.data),
	put: (url, body) => axios.put(url, body).then(res => res),
	delete: url => axios.delete(url).then(res => res),
};

const Servisi = {
	listSvih: params => axios.get('/ActivitiesTable', { params }).then(res => res),
	listaJednog: id => request.get(`/ActivitiesTable/${id}`),
	kreiraj: activity => request.post('/ActivitiesTable', activity),
	update: activity => request.put(`/ActivitiesTable/${activity.id}`, activity),
	obrisi: id => request.delete(`/ActivitiesTable/${id}`),
	attend: id => request.post(`/ActivitiesTable/${id}/attend`, {}),
};

const Account = {
	current: () => request.get('/account'),
	login: user => request.post('/account/login', user),
	register: user => request.post('/account/register', user),
};

const Profiles = {
	get: username => request.get(`/profiles/${username}`),
	uploadPhoto: file => {
		let formData = new FormData();
		formData.append('File', file);
		return axios.post('photos', formData, {
			headers: { 'Content-type': 'multipart/form-data' },
		});
	},
	setMainPhoto: id => request.post(`/photos/${id}/setMain`, {}),
	deletePhoto: id => request.delete(`/photos/${id}`),
	updateProfile: profile => request.put(`/profiles`, profile),
	updateFollowing: username => request.post(`/follow/${username}`, {}),
	listFollowings: (username, predicate) => request.get(`/follow/${username}?predicate=${predicate}`),
};

const agent = {
	Servisi,
	Account,
	Profiles,
};

export default agent;
