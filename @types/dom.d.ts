/**
 * List all custom events here. This will prevent "TS2769: No overload matches this call"
 * errors on CustomEvent listeners
 */
interface CustomEventMap {
	'loadingUpdated': CustomEvent<boolean>;
	'MiddleName:valueChanges': CustomEvent<string>;
}

/**
 * Augments the global definition of document's addEventListener to accept
 * the names defined in CustomEventMap
 */
declare global {
	interface Document {
		addEventListener<K extends keyof CustomEventMap>(type: K, listener: (this: Document, ev: CustomEventMap[K]) => void): void;
		dispatchEvent<K extends keyof CustomEventMap>(ev: CustomEventMap[K]): void;
	}
}
export { };
