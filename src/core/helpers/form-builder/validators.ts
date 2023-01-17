import AbstractControl from '@core/helpers/form-builder/abstract-control';
import {FormError} from '@core/interfaces/form-builder.interface';

export const required = (control: AbstractControl<any>) => {
	// Can't just use a truthy check because it could be a number field of which 0 would fail validation
	console.log('[required] control=', control);
	if (control && (control.value === undefined || control.value === null || control.value === '')) {
		const formError: FormError = {errorName: 'required', active: true};
		return formError;
	}
	return null;
};

export const min = (control: AbstractControl<number>) => {
	return null;
};

export const max = (control: AbstractControl<number>) => {
	return null;
};

export const pattern = (pattern: RegExp) => {
	return (control: AbstractControl<string>) => {
		console.log('[pattern] control=', control);
		const val = control.value;
		if (val && !pattern.test(val)) {
			const formError = {errorName: 'pattern', active: true};
			return formError;
		}
		return null;
	};
};

export const email = (control: AbstractControl<any>) => {
	return null;
};

export const maxLength = (control: AbstractControl<any>) => {
	return null;
};

export const minLength = (control: AbstractControl<any>) => {
	return null;
};
