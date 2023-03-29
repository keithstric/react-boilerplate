import FormControlComp from '@core/components/form-builder/FormControlComp';
import FormGroup from '@core/helpers/form-builder/form-group';
import {
	FormGroupControls,
	ReactiveFormTypes,
	UpdateOnHooks,
	ValidatorFn,
} from '@core/interfaces/form-builder.interface';
import React from 'react';

export interface FormGroupCompProps {
	updateOn?: UpdateOnHooks;
	name: string;
	children: JSX.Element;
	validators?: ValidatorFn | ValidatorFn[];
}

export interface FormGroupCompState {
	formGroup: FormGroup<unknown>;
}

export default class FormGroupComp extends React.Component {
	props: FormGroupCompProps;

	constructor(props: FormGroupCompProps) {
		super(props);
		this.props = props;
		this.state = {
			formGroup: new FormGroup<any>(this.props.validators),
		};
		this.formGroup.controlName = this.props.name;
		if (this.props.updateOn) {
			this.formGroup.updateOn = this.props.updateOn;
		}
	}

	componentDidMount() {
		console.log('[FormGroupComp.componentDidMount] children.props.children=', this.props.children.props.children);
		console.log('[FormGroupComp.componentDidMount] props=', this.props);
		console.log('[FormGroupComp.componentDidMount] state=', this.state);
		this.formGroup.controlName = this.props.name;
		if (!Array.isArray(this.props.children) && Array.isArray(this.props.children.props.children)) {
			const formCtrls: FormControlComp[] = this.props.children.props.children;
			const controls: FormGroupControls = {};
			formCtrls.forEach((ctrl: FormControlComp) => {
				console.log('ctrl=', ctrl);
				controls[ctrl.props.name] = ((ctrl as any).ref.current as FormControlComp).control;
			});
			this.formGroup.controls = controls;
		}
	}

	get formGroup(): FormGroup<any> {
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
