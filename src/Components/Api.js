import baseUrl from './BaseUrl';
import geoURL from './GeoApi';

export const getCountries = () => {
	let result = baseUrl
		.get(`/summary`, {})
		.then(response => {
			return response.data.Countries;
		})
		.catch(error => {
			return error;
		});

	return result;
};

export const getdetails = slug => {
	let result = baseUrl
		.get(`total/country/${slug}/status/confirmed`, {})
		.then(response => {
			return response.data;
		})
		.catch(error => {
			console.log('soy el error', error);
			return error;
		});

	return result;
};

export const getGeoInfo = () => {
	let result = geoURL
		.get()
		.then(response => {
			console.log(response.data);
			return response.data;
		})
		.catch(error => {
			console.log(error);
		});
	return result;
};
