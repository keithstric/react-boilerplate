import {LogBook} from '@core/services/logger/logbook';

export default class CustomEventService {
	private _eventMap: {[key: string]: CustomEvent} = {};

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	constructor() {}

	createEvent(evtName: string, evtProperties: CustomEventInit) {
		if ((!evtName && !evtProperties) || !evtName || !evtProperties) {
			throw new Error('Not enough information to create event');
		}
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-assignment
		this._eventMap[evtName] = new CustomEvent(evtName, {...evtProperties});
		return this._eventMap[evtName];
	}

	fireEvent(evtName: string, evtProperties?: CustomEventInit) {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		LogBook.getInstance().debug(`[CustomEventService.fireEvent] ${evtName}`, evtProperties);
		let event = this._eventMap[evtName];
		if (!event && evtProperties) {
			event = this.createEvent(evtName, evtProperties);
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			document.dispatchEvent(event);
		} else if (event) {
			if (evtProperties) {
				if (evtProperties.detail !== event.detail) {
					event = this.createEvent(evtName, evtProperties);
				}
			}
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			document.dispatchEvent(event);
		} else {
			throw new Error(`Event ${evtName} does not exist`);
		}
		return event;
	}
}
