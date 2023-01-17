import FormGroup from '@core/helpers/form-builder/form-group';
import {ValidatorFn} from '@core/interfaces/form-builder.interface';

export default class FormArray<TValue> extends FormGroup<TValue> {
	constructor(validators?: ValidatorFn | ValidatorFn[]) {
		super(validators);
	}

	protected _getControl(name: string | number) {
		// @ts-ignore: This works for an object or an array
		return this.controls[name];
	}
}
