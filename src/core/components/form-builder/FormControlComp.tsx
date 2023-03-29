import FormControl from '@core/helpers/form-builder/form-control';
import {UpdateOnHooks, ValidatorFn} from '@core/interfaces/form-builder.interface';
import React from 'react';

export interface FormControlCompProps {
	updateOn?: UpdateOnHooks;
	name: string;
	children: JSX.Element;
	validators?: ValidatorFn | ValidatorFn[];
	label?: string;
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
			control: new FormControl<string | number | undefined>(this.props.validators),
		};
		this.control.controlName = this.props.name;
		if (props.updateOn) {
			this.control.updateOn = props.updateOn;
		}
	}

	componentDidMount() {
		// @ts-ignore: children of this element MUST have a ref
		this.control.element = this.props.children.ref.current;
	}

	get control(): FormControl<any> {
		// @ts-ignore: it does exist and is set in the constructor
		return this.state.control;
	}

	getLabel() {
		if (this.props.label) {
			// todo: Figure out how to style
			return <label>{this.props.label}</label>;
		}
		return null;
	}

	render() {
		return (
			<div className="form-control">
				{this.getLabel()}
				{this.props.children}
			</div>
		);
	}
}
