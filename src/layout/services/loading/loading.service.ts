import CustomEventService from '@core/services/custom-event/custom-event.service';
import {LogBook} from '@core/services/logger/logbook';
import {AxiosRequestConfig} from 'axios';

export default class LoadingService {
	private customEventSvc = new CustomEventService();
	static instance: LoadingService | null = null;
	static instanceId: number;
	loadingMap: Map<AxiosRequestConfig, boolean> = new Map<AxiosRequestConfig, boolean>();
	loading = false;

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	constructor() {}

	static getInstance() {
		if (!LoadingService.instance) {
			LoadingService.instance = new LoadingService();
			LoadingService.instanceId = new Date().getTime();
		}
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		LogBook.getInstance().silly('[LoadingService.getInstance] instanceId=', LoadingService.instanceId);
		return LoadingService.instance;
	}

	setLoading(loading: boolean, request: AxiosRequestConfig) {
		if (loading) {
			this.loadingMap.set(request, loading);
			this.loading = true;
		} else if (!loading && this.loadingMap.has(request)) {
			this.loadingMap.delete(request);
			if (this.loadingMap.size === 0) {
				this.loading = false;
			}
		}
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		LogBook.getInstance().silly('[LoadingService.setLoading], loading=', loading);
		this.customEventSvc.fireEvent('loadingUpdated', {detail: this.loading});
	}
}
