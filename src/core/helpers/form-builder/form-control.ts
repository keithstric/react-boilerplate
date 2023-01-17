import AbstractControl from '@core/helpers/form-builder/abstract-control';
import {ReactiveFormElement, ValidatorFn} from '@core/interfaces/form-builder.interface';

export default class FormControl<TValue> extends AbstractControl<TValue> {
	constructor(validators?: ValidatorFn | ValidatorFn[] | undefined) {
		super(validators);
	}

	set element(element: ReactiveFormElement | undefined) {
		this._element = element;
		if (this.element) {
			switch (this.updateOn) {
			case 'blur':
				this.element.onblur = this._update.bind(this);
				break;
			case 'change':
				this.element.onchange = this._update.bind(this);
				break;
			case 'submit':
				this.element.onsubmit = this._update.bind(this);
				break;
			}
			this.element.onfocus = () => {
				this._touched = true;
			};
			if (this.element.disabled) {
				this._status = 'DISABLED';
				this.statusChanges.next(this.status);
			}
		}
	}

	private _update(evt: Event) {
		evt.preventDefault();
		// @ts-ignore: the value can actually be anything
		this.value = evt.target.value;
		this._pristine = false;
	}
}
