import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/api';

const sleep = delay => {
	return new Promise(res => {
		setTimeout(res, delay);
	});
};

axios.interceptors.response.use(async res => {
	try {
		console.log('%c interceptors ', 'color:gold', res);
		await sleep(1000);
		return res;
	} catch (error) {
		console.log('%c Greska ', 'color:red', error);
		return await Promise.reject(error);
	}
});

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
			.catch(err => console.log('%c SERVIS err ', 'color:red', err));
	},
	put: async (url, body) => {
		await axios
			.put(url, body)
			.then(res => {
				return res;
			})
			.catch(err => {
				console.log('%c Greska ', 'color:red', err);
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
