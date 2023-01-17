import FormGroup from '@core/helpers/form-builder/form-group';
import FormControl from '@core/helpers/form-builder/form-control';
import {UpdateOnHooks, ValidatorFn} from '@core/interfaces/form-builder.interface';
import React from 'react';

export interface FormGroupCompProps {
	updateOn?: UpdateOnHooks;
	name: string;
	children: JSX.Element;
	validators?: ValidatorFn | ValidatorFn[];
}

export default class FormGroupComp extends React.Component {
	props: FormGroupCompProps;

	constructor(props: FormGroupCompProps) {
		super(props);
		this.props = props;
		this.state = {
			formGroup: new FormGroup<any>(this.props.validators),
		};
		this.control.controlName = this.props.name;
		if (this.props.updateOn) {
			this.control.updateOn = this.props.updateOn;
		}
	}

	componentDidMount() {
		// @ts-ignore: children of this element MUST have a ref
		// this.control.element = this.props.children.ref.current;
	}

	get control(): FormControl<any> {
		// @ts-ignore: it does exist and is set in the constructor
		return this.state.formGroup;
	}

	render() {
		return (
			<div>
				<h4>FormGroupComp</h4>
				{this.props.children}
			</div>
		);
	}
}
