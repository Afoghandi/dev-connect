import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';

const Dashboard = () => {
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	const profile = useSelector((state) => state.profile);

	useEffect(() => {
		dispatch(getCurrentProfile());
	}, []);
	return <div>Dashboadr</div>;
};

export default Dashboard;
