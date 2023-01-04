/* eslint-disable  @typescript-eslint/no-unsafe-call */
/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {ApiMethod} from '@core/interfaces/core.interfaces';
import {HttpRequestConfig} from '@core/interfaces/http.interface';
import axios, {AxiosRequestConfig} from 'axios';

export default class HttpService {
	static instance: HttpService | null = null;

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	constructor() {}

	static getInstance() {
		if (!HttpService.instance) {
			HttpService.instance = new HttpService();
		}
		return HttpService.instance;
	}

	doRequest(apiUrl: string, method: ApiMethod, body?: any, config?: HttpRequestConfig) {
		const axiosCfg: AxiosRequestConfig = {
			method,
			headers: config?.headers,
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			data: body,
			url: apiUrl,
			responseType: config?.responseType || 'json',
			withCredentials: config?.withCredentials || false,
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			params: config?.params,
		};
		return axios.request(axiosCfg);
	}
}
