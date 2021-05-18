import React, { Fragment, useState } from 'react';

import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { addEducation } from '../../actions/profile';
const AddEducation = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const [formData, setFormData] = useState({
		school: '',
		degree: '',
		fieldofstudy: '',
		from: '',
		to: '',
		current: false,
		description: '',
	});
	const [toDateDisabled, setToDateDisabled] = useState(false);
	const { school, degree, fieldofstudy, from, to, current, description } =
		formData;
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(addEducation(formData, history));
	};
	return (
		<Fragment>
			<h1 class='large text-primary'>Add Your Education</h1>
			<p class='lead'>
				<i class='fas fa-code-branch'></i> Add any school or bootcamp that you
				have attended
			</p>
			<small>* = required field</small>
			<form
				className='form'
				onSubmit={(e) => {
					handleSubmit(e);
				}}
			>
				<div className='form-group'>
					<input
						type='text'
						placeholder='* Schhol or Bootcamp'
						name='school'
						required
						value={school}
						onChange={(e) => handleChange(e)}
					/>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='* Degree or Certificate'
						name='degree'
						required
						value={degree}
						onChange={(e) => handleChange(e)}
					/>
				</div>

				<div className='form-group'>
					<input
						type='text'
						placeholder='fieldofstudy'
						name='fieldofstudy'
						value={fieldofstudy}
						onChange={(e) => handleChange(e)}
					/>
				</div>
				<div className='form-group'>
					<h4>From Date</h4>
					<input
						type='date'
						name='from'
						value={from}
						onChange={(e) => handleChange(e)}
					/>
				</div>
				<div className='form-group'>
					<p>
						<input
							type='checkbox'
							name='current'
							checked={current}
							value={current}
							onChange={(e) => {
								setFormData({ ...formData, current: !current });
								setToDateDisabled(!toDateDisabled);
							}}
						/>{' '}
						Current Job
					</p>
				</div>
				<div className='form-group'>
					<h4>To Date</h4>
					<input
						type='date'
						name='to'
						value={to}
						onChange={(e) => handleChange(e)}
						disabled={toDateDisabled ? 'disabled' : ''}
					/>
				</div>
				<div className='form-group'>
					<textarea
						name='description'
						cols='30'
						rows='5'
						placeholder='Programme Description'
						value={description}
						onChange={(e) => handleChange(e)}
					></textarea>
				</div>
				<input type='submit' className='btn btn-primary my-1' />
				<a className='btn btn-light my-1' href='dashboard.html'>
					Go Back
				</a>
			</form>
		</Fragment>
	);
};

export default AddEducation;
