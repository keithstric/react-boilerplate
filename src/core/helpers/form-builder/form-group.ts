import AbstractControl from '@core/helpers/form-builder/abstract-control';
import {FormArray} from '@core/helpers/form-builder/form-array';
import FormControl from '@core/helpers/form-builder/form-control';
import {ControlEventOptions, ValidatorFn} from '@core/interfaces/form-builder.interface';

export type ReactiveFormTypes = FormControl<any> | FormArray<any> | FormGroup<any>;

export class FormGroup<TValue> extends AbstractControl<TValue> {
	private _controls: Map<string, ReactiveFormTypes> = new Map<string, ReactiveFormTypes>();

	constructor(validators?: ValidatorFn | ValidatorFn[]) {
		super(validators);
	}

	get controls() {
		return this._controls;
	}

	get(controlPath: string) {
		// not empty
	}

	addControl(formControl: ReactiveFormTypes, validators: ValidatorFn | ValidatorFn[], options: any) {
		// not empty
	}

	removeControl(formControl: ReactiveFormTypes) {
		// not empty
	}

	updateValueAndValidity(options: ControlEventOptions = {emitEvent: true}) {
		// not empty
	}
}
