import FormControlComp from '@core/components/form-builder/FormControlComp';
import FormGroupComp from '@core/components/form-builder/FormGroupComp';
import {pattern, required} from '@core/helpers/form-builder/validators';
import React, {useRef} from 'react';

export const ReactiveFormDemo = () => {
	/**
	 * Stand-alone Form controls
	 * Must define refs for each form control "field" element
	 */
	const firstNameEl = useRef(null);
	const lastNameEl = useRef(null);
	const middleNameEl = useRef(null);
	const genderEl = useRef(null);

	return (
		<div>
			<h3>Stand-alone Form Controls</h3>
			<FormControlComp name="FirstName">
				<input ref={firstNameEl} type="text" disabled />
			</FormControlComp>
			<FormControlComp name="LastName" validators={required}>
				<input ref={lastNameEl} type="text" />
			</FormControlComp>
			<FormControlComp name="MiddleName" validators={[required, pattern(/[a-zA-Z0-9]+-[0-9]{3}$/)]}>
				<input ref={middleNameEl} type="text" />
			</FormControlComp>
			<FormControlComp name="Gender">
				<select ref={genderEl}>
					<option value="male">Male</option>
					<option value="female">Female</option>
					<option value="who-knows">Other</option>
				</select>
			</FormControlComp>

			<h3>Form Group</h3>
			<FormGroupComp name="root">
				<span>This is a FormGroup</span>
			</FormGroupComp>
		</div>
	);
};

export default ReactiveFormDemo;
