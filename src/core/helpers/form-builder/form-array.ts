import {FormGroup} from '@core/helpers/form-builder/form-group';
import {ValidatorFn} from '@core/interfaces/form-builder.interface';

export class FormArray<TValue> extends FormGroup<TValue> {
	constructor(validators?: ValidatorFn | ValidatorFn[]) {
		super(validators);
	}
}
