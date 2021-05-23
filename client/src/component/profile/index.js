import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../loading/index';
import { getProfileById } from '../../actions/profile';
import { Link } from 'react-router-dom';

const Profile = ({ match }) => {
	const getProfile = useSelector((state) => state.profile);
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	const { profile, loading } = getProfile;
	useEffect(() => {
		dispatch(getProfileById(match.params.id));
	}, [dispatch]);
	return (
		<Fragment>
			{profile === null || loading ? (
				<Spinner />
			) : (
				<Fragment>
					<Link to='/profiles' className='btn btn-light'>
						{' '}
						Back To Profiles
					</Link>
					{auth.isAuthenticated &&
						auth.loading === false &&
						auth.user._id === profile.user._id && (
							<Link to='/edit-profile' className='btn btn-dark'>
								Edit Profile
							</Link>
						)}
				</Fragment>
			)}
		</Fragment>
	);
};

export default Profile;
