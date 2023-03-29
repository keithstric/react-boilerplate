import FormControlComp from '@core/components/form-builder/FormControlComp';
import FormGroupComp from '@core/components/form-builder/FormGroupComp';
import {pattern, required} from '@core/helpers/form-builder/validators';
import React, {useRef} from 'react';

export const ReactiveFormDemo = () => {
	/**
	 * Stand-alone Form controls
	 * Must define refs for each form control "field" element
	 */
	const firstNameCtrlEl = useRef(null);
	const lastNameCtrlEl = useRef(null);
	const middleNameCtrlEl = useRef(null);
	const genderCtrlEl = useRef(null);
	const lastNameGrpEl = useRef(null);
	const middleNameGrpEl = useRef(null);
	const lastNameCtrl = useRef(null);
	const middleNameCtrl = useRef(null);

	return (
		<div>
			<h3>Stand-alone Form Controls</h3>
			<FormControlComp name="FirstName">
				<input ref={firstNameCtrlEl} type="text" disabled />
			</FormControlComp>
			<FormControlComp name="LastName" validators={required}>
				<input ref={lastNameCtrlEl} type="text" />
			</FormControlComp>
			<FormControlComp name="MiddleName" label="Middle Name" updateOn="input" validators={[required, pattern(/[a-zA-Z0-9]+-[0-9]{3}$/)]}>
				<input ref={middleNameCtrlEl} type="text" />
			</FormControlComp>
			<FormControlComp name="Gender">
				<select ref={genderCtrlEl}>
					<option value="male">Male</option>
					<option value="female">Female</option>
					<option value="who-knows">Other</option>
				</select>
			</FormControlComp>

			<h3>Form Group</h3>
			<FormGroupComp name="root">
				<div>
					<FormControlComp ref={lastNameCtrl} name="LastName" validators={required}>
						<input ref={lastNameGrpEl} type="text" />
					</FormControlComp>
					<FormControlComp ref={middleNameCtrl} name="MiddleName" label="Middle Name" updateOn="input" validators={[required, pattern(/[a-zA-Z0-9]+-[0-9]{3}$/)]}>
						<input ref={middleNameGrpEl} type="text" />
					</FormControlComp>
				</div>
			</FormGroupComp>
		</div>
	);
};

export default ReactiveFormDemo;
