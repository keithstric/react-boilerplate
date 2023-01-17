import FormControl from '@core/helpers/form-builder/form-control';
import {UpdateOnHooks, ValidatorFn} from '@core/interfaces/form-builder.interface';
import React from 'react';

export interface FormControlCompProps {
	updateOn?: UpdateOnHooks;
	name: string;
	children: JSX.Element;
	validators?: ValidatorFn | ValidatorFn[];
}

export interface FormControlCompState {
	control: FormControl<unknown>;
}

export default class FormControlComp extends React.Component {
	props: FormControlCompProps;

	constructor(props: FormControlCompProps) {
		super(props);
		this.props = props;
		this.state = {
			control: new FormControl<string | number | undefined>(),
		};
		if (props.validators) {
			// @ts-ignore: It's set a couple of lines above
			this.state.control.setValidators(props.validators);
		}
	}

	componentDidMount() {
		// @ts-ignore: children of this element MUST have a ref
		this.control.element = this.props.children.ref.current;
		this.control.controlName = this.props.name;
		if (this.props.updateOn) {
			this.control.updateOn = this.props.updateOn;
		}
	}

	get control(): FormControl<any> {
		// @ts-ignore: it does exist and is set in the constructor
		return this.state.control;
	}

	render() {
		return (
			<div className="form-control">
				{this.props.children}
			</div>
		);
	}
}
