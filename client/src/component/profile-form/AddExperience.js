import React, { Fragment, useState } from 'react';

import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { addExperience } from '../../actions/profile';
const AddExperience = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const [formData, setFormData] = useState({
		company: '',
		title: '',
		location: '',
		from: '',
		to: '',
		current: false,
		description: '',
	});
	const [toDateDisabled, setToDateDisabled] = useState(false);
	const { company, title, location, from, to, current, description } = formData;
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(addExperience(formData, history));
	};
	return (
		<Fragment>
			<h1 class='large text-primary'>Add An Experience</h1>
			<p class='lead'>
				<i class='fas fa-code-branch'></i> Add any developer/programming
				positions that you have had in the past
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
						placeholder='* Job Title'
						name='title'
						required
						value={title}
						onChange={(e) => handleChange(e)}
					/>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='* Company'
						name='company'
						required
						value={company}
						onChange={(e) => handleChange(e)}
					/>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Location'
						name='location'
						value={location}
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
						placeholder='Job Description'
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

export default AddExperience;
