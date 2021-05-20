import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import Moment from 'react-moment';

const Education = ({ education }) => {
	const educations = education.map((edu) => (
		<tr key={edu._id}>
			<td>{edu.school} </td>
			<td className='hide-sm'>{edu.degree} </td>
			<td>
				<Moment format='dd/mm/yyyy'>{edu.from} </Moment> -{' '}
				{edu.to === null ? (
					'Now'
				) : (
					<Moment format='dd/mm/yyyy'>{edu.to} </Moment>
				)}
				{console.log(edu.from)}
			</td>
			<td>
				<button className='btn btn-danger'>Delete</button>
			</td>
		</tr>
	));
	return (
		<Fragment>
			<h2 className='my-2'>Education Credentials</h2>
			<table className='table'>
				<thead>
					<tr>
						<th>School</th>
						<th className='hide-sm'>Degree</th>
						<th className='hide-sm'>Years</th>
						<th />
					</tr>
				</thead>
				<tbody>{educations} </tbody>
			</table>
		</Fragment>
	);
};

export default Education;
