import LoadingService from '@layout/services/loading/loading.service';
import {logger} from '@src/App';
import axios from 'axios';

export const setupRequestInterceptor = () => {
	axios.interceptors.request.use((config) => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
		logger?.info('[setupRequestInterceptor] axios Request interceptor fired: config=', config);
		const loadingService = LoadingService.getInstance();
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
		const loadingService = LoadingService.getInstance();
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
		loadingService.setLoading(false, response.config);
		return response;
	}, (error) => {
		return Promise.reject(error);
	});
};

export default {
	setupRequestInterceptor,
	setupResponseInterceptor,
};
