import axios from 'axios';

const API_URL = 'http://time.jsontest.com';

export const getApiTime = async () => {
	try {
		const response = await axios.get(API_URL);
		return response.data;
	} catch (error) {
		console.error('Error fetching API time:', error);
		throw error;
	}
};
