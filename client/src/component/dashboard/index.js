import React, { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Spinner } from '../index';
import { getCurrentProfile } from '../../actions/profile';
import DashboardActions from './DashboardActions';

const Dashboard = () => {
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	const getProfile = useSelector((state) => state.profile);
	const { user } = auth;
	const { profile, loading } = getProfile;

	useEffect(() => {
		dispatch(getCurrentProfile());
	}, []);
	return loading && profile === null ? (
		<Spinner />
	) : (
		<Fragment>
			<h1 className='large text-primary'>Dashboard</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Welcome {user && user.name}{' '}
			</p>
			{profile !== null ? (
				<Fragment>
					{' '}
					<DashboardActions />
				</Fragment>
			) : (
				<Fragment>
					<p> You have not yet set up a profile, please add some info</p>
					<Link to='/create-profile' className='btn btn-primary my-1'>
						{' '}
						Create Profile
					</Link>
				</Fragment>
			)}
		</Fragment>
	);
};

export default Dashboard;
