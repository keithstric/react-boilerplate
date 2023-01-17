import AbstractControl from '@core/helpers/form-builder/abstract-control';

export interface FormError {
	errorName: string;
	active: boolean;
}

export interface ControlEventOptions {
	emitEvent: boolean;
}

export type ValidatorFn = (control: AbstractControl<any>) => FormError | null;
export type FormControlStatus = 'VALID' | 'INVALID' | 'PENDING' | 'DISABLED';
export type ValidationErrors = {[key: string]: FormError | FormError[]};
export type UpdateOnHooks = 'change' | 'blur' | 'submit';
export type ReactiveFormElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
export type ReactiveGroupElement = HTMLDivElement | HTMLFormElement;

