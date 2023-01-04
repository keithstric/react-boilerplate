import {AxiosRequestConfig} from 'axios';

export default class LoadingService {
	static instance: LoadingService | null = null;
	loadingMap: Map<AxiosRequestConfig, boolean> = new Map<AxiosRequestConfig, boolean>();
	loading = false;

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	constructor() {}

	static getInstance() {
		if (!LoadingService.instance) {
			LoadingService.instance = new LoadingService();
		}
		return LoadingService.instance;
	}

	setLoading(loading: boolean, request: AxiosRequestConfig) {
		console.log('[setLoading], loading=', loading);
		console.log('[setLoading], request=', request);
		if (loading) {
			this.loadingMap.set(request, loading);
			this.loading = true;
		} else if (!loading && this.loadingMap.has(request)) {
			this.loadingMap.delete(request);
			if (this.loadingMap.size === 0) {
				this.loading = false;
			}
			console.log('[setLoading] loadingMap=', this.loadingMap);
		}
	}
}
