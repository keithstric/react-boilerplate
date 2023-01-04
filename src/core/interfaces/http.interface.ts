import {AxiosHeaders} from 'axios';

export interface HttpRequestConfig {
	headers?: AxiosHeaders | {
		[header: string]: string | string[];
	};
	observe?: 'body';
	params?: any | {
		[param: string]: string | string[];
	};
	reportProgress?: boolean;
	responseType?: 'json';
	withCredentials?: boolean;
}
