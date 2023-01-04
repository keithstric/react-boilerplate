import {loadingService, logger} from '@src/App';
import axios from 'axios';

export const setupRequestInterceptor = () => {
	axios.interceptors.request.use((config) => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
		logger?.info('[setupRequestInterceptor] axios Request interceptor fired: config=', config);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
		loadingService.setLoading(true, config);
		return config;
	}, (error) => {
		return Promise.reject(error);
	});
};

export const setupResponseInterceptor = () => {
	axios.interceptors.response.use((response) => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
		logger?.info('[setupResponseInterceptor] axios Response interceptor fired: response=', response);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
		loadingService.setLoading(false, response.config);
		return response;
	}, (error) => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
		loadingService.setLoading(false, { } );
		return Promise.reject(error);
	});
};

export default {
	setupRequestInterceptor,
	setupResponseInterceptor,
};
