import AbstractControl from '@core/helpers/form-builder/abstract-control';
import FormArray from '@core/helpers/form-builder/form-array';
import FormControl from '@core/helpers/form-builder/form-control';
import FormGroup from '@core/helpers/form-builder/form-group';

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
export type ReactiveFormTypes = FormControl<any> | FormArray<any> | FormGroup<any>;
export type FormGroupControls = {[key: string]: ReactiveFormTypes};
export type FormArrayControls = ReactiveFormTypes[];

