import AbstractControl from '@core/helpers/form-builder/abstract-control';
import FormControl from '@core/helpers/form-builder/form-control';
import {
	ControlEventOptions, FormArrayControls,
	FormGroupControls,
	ReactiveFormTypes,
	ValidatorFn,
} from '@core/interfaces/form-builder.interface';
import {createContext} from 'react';

export default class FormGroup<TValue> extends AbstractControl<TValue> {
	protected _controls: FormGroupControls | FormArrayControls[] = {};

	constructor(validators?: ValidatorFn | ValidatorFn[]) {
		super(validators);
	}

	get controls() {
		return this._controls;
	}

	protected _getControl(name: string | number): ReactiveFormTypes {
		// @ts-ignore: This works for an object or an array
		return this.controls[name];
	}

	get(controlPath: string): ReactiveFormTypes | undefined {
		const controlPathArr = controlPath.split('.');
		const ctrls: ReactiveFormTypes[] = [this];
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		let targetCtrl: ReactiveFormTypes | undefined = this;
		let currIdx = 0;
		while (!(targetCtrl instanceof FormControl) && targetCtrl) {
			// @ts-ignore: It does exist
			targetCtrl = targetCtrl._getControl(controlPathArr[currIdx]);
			if (targetCtrl) {
				ctrls.push(targetCtrl);
			}
			currIdx++;
		}
		console.log('[FormGroup.get], ctrls=', ctrls);
		return targetCtrl;
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

export const FormGroupContext = createContext(FormGroup);
