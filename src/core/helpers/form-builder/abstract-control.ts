import FormArray from '@core/helpers/form-builder/form-array';
import FormGroup from '@core/helpers/form-builder/form-group';
import {
	ControlEventOptions,
	FormControlStatus, FormError, ReactiveFormElement, ReactiveGroupElement,
	UpdateOnHooks, ValidationErrors,
	ValidatorFn,
} from '@core/interfaces/form-builder.interface';
import {BehaviorSubject} from 'rxjs';

export default class AbstractControl<TValue> {
	private _validators: ValidatorFn[] = [];
	private _parent: FormGroup<TValue> | FormArray<TValue> | undefined;
	private _value: TValue | undefined;
	protected _status: FormControlStatus = 'INVALID';
	protected _pristine = true;
	protected _touched = false;
	protected _updateOn: UpdateOnHooks = 'change';
	protected _element: ReactiveFormElement | ReactiveGroupElement | undefined;
	protected _controlName = '';
	protected _errors: ValidationErrors | undefined;
	valueChanges: BehaviorSubject<TValue | undefined> = new BehaviorSubject<TValue | undefined>(undefined);
	statusChanges: BehaviorSubject<FormControlStatus> = new BehaviorSubject<FormControlStatus>(this.status);

	/**
	 * Provide the validators for THIS individual control. Each control should have
	 * it's own validators. They do not propagate down the tree
	 * @param validators
	 */
	constructor(validators?: ValidatorFn | ValidatorFn[] | undefined) {
		if (validators) {
			this.setValidators(validators);
		}
	}

	get element() {
		console.log('[element getter] this._element=', this._element);
		return this._element;
	}

	set element(element: ReactiveFormElement | ReactiveGroupElement | undefined) {
		this._element = element;
	}

	get controlName() {
		return this._controlName;
	}

	set controlName(controlName) {
		this._controlName = controlName;
	}

	get dirty() {
		return !this._pristine;
	}

	get disabled() {
		return this.status === 'DISABLED';
	}

	get enabled() {
		return this.status !== 'DISABLED';
	}

	get errors() {
		return this._errors;
	}

	get invalid() {
		return this.status === 'INVALID';
	}

	get parent() {
		return this._parent;
	}

	get pending() {
		return this.status === 'PENDING';
	}

	get pristine() {
		return this._pristine;
	}

	get root() {
		let root = this.parent;
		while (root) {
			if (root.parent) {
				root = root.parent;
			}
		}
		return root;
	}

	get status(): FormControlStatus {
		return this._status;
	}

	get touched() {
		return this._touched;
	}

	get untouched() {
		return !this.touched;
	}

	get updateOn() {
		return this._updateOn;
	}

	set updateOn(updateOn: UpdateOnHooks) {
		this._updateOn = updateOn;
	}

	get valid() {
		return this.status === 'VALID';
	}

	get value() {
		return this._value;
	}

	set value(value: TValue | undefined) {
		this._value = value;
		this.updateValueAndValidity();
	}

	private _setParent(parent: FormGroup<TValue> | FormArray<TValue> | undefined) {
		this._parent = parent;
	}

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	private _validate() {
		return this._validators.map((validator) => {
			return validator(this);
		})
			.filter((result) => result);
	}

	addValidators(validators: ValidatorFn | ValidatorFn[]) {
		if (Array.isArray(validators)) {
			this._validators = [...this._validators, ...validators];
		} else {
			this._validators = [...this._validators, validators];
		}
	}

	clearValidators() {
		this._validators = [];
	}

	hasValidator(validator: ValidatorFn) {
		return !!this._validators.find((currVal) => currVal === validator);
	}

	removeValidator(validator: ValidatorFn) {
		const validatorIdx = this._validators.findIndex((currVal) => currVal === validator);
		if (validatorIdx > -1) {
			this._validators.splice(validatorIdx, 1);
		}
	}

	setValidators(validators: ValidatorFn | ValidatorFn[]) {
		if (Array.isArray(validators)) {
			this._validators = validators;
		} else {
			this._validators = [validators];
		}
	}

	updateValueAndValidity(options: ControlEventOptions = {emitEvent: true, recursive: true}) {
		const errors = this._validate();
		if (errors?.length) {
			this._status = 'INVALID';
			this._errors = this.errors || {};
			const controlErrors = this._errors[this.controlName];
			if (controlErrors && Array.isArray(controlErrors)) {
				// @ts-ignore: errors should not have any null values
				this._errors[this.controlName] = [...this.errors[this.controlName], ...new Set(errors)];
			} else {
				// @ts-ignore: errors should not have any null values
				this._errors[this.controlName] = [...errors];
			}
		} else {
			this._status = 'VALID';
			this._errors = undefined;
		}
		if (options?.emitEvent) {
			console.log('[AbstractControl.updateValueAndValidity] emitEvent');
			this.statusChanges.next(this.status);
			this.valueChanges.next(this.value);
		}
		console.log('[AbstractControl.updateValueAndValidity]', this);
	}
}
