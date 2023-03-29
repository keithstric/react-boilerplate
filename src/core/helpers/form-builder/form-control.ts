import AbstractControl from '@core/helpers/form-builder/abstract-control';
import {ReactiveFormElement, ReactiveGroupElement, ValidatorFn} from '@core/interfaces/form-builder.interface';

export default class FormControl<TValue> extends AbstractControl<TValue> {
	protected _element: ReactiveFormElement | undefined;

	constructor(validators?: ValidatorFn | ValidatorFn[] | undefined) {
		super(validators);
	}

	get element() {
		return this._element;
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
			case 'input':
				this.element.oninput = this._update.bind(this);
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
		this.value = (evt.target as ReactiveFormElement)?.value as any;
		this._pristine = false;
	}
}
