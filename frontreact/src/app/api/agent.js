import axios from 'axios';
import { toast } from 'react-toastify';
import { history } from '../..';
import { store } from '../stores/store';

axios.defaults.baseURL = 'http://localhost:5000/api';

const sleep = delay => {
	return new Promise(res => {
		setTimeout(res, delay);
	});
};

axios.interceptors.response.use(
	async res => {
		await sleep(300);
		return res;
	},
	err => {
		console.log('%c 026 data=', 'color:green', err.response);
		const { data, status, config } = err.response;

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
				toast.error('neautoriziran');
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

// axios.interceptors.response.use(async res => {
// 	try {
// 		console.log('%c interceptors ', 'color:gold', res);
// 		await sleep(300);
// 		return res;
// 	} catch (error) {
// 		console.log('%c Greska ', 'color:red', error);
// 		return await Promise.reject(error);
// 	}
// });

const request = {
	get: async url => await axios.get(url).then(res => res.data),
	post: async (url, body) => {
		let axiosConfig = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		await axios
			.post(url, body, axiosConfig)
			.then(res => res.data)
			.catch(err => console.log('%c 027 SERVIS err ', 'color:red', err));
	},
	put: async (url, body) => {
		await axios
			.put(url, body)
			.then(res => {
				return res;
			})
			.catch(err => {
				console.log('%c  028 Greska ', 'color:red', err);
			});
	},
	delete: async url =>
		await axios.delete(url).then(res => {
			res.poruka = 'OBRISANO';
			return res.data;
		}),
};

const Servisi = {
	listSvih: () => request.get('/ActivitiesTable'),
	listaJednog: id => request.get(`/ActivitiesTable/${id}`),
	kreiraj: activity => request.post('/ActivitiesTable', activity),
	update: activity => request.put(`/ActivitiesTable/${activity.id}`, activity),
	obrisi: id => request.delete(`/ActivitiesTable/${id}`),
};

export default Servisi;
