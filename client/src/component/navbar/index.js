import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/auth';

import './styles/navbar.css';
import { Fragment } from 'react';
const Navbar = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const auth = useSelector((state) => state.auth);
	const { isAuthenticated, loading } = auth;

	const logoutFunc = () => {
		dispatch(logout());
		history.push('/dashboard');
	};

	const authLinks = (
		<ul>
			<li>
				<Link to='/profiles'> Developers </Link>{' '}
			</li>{' '}
			<li>
				<Link to='/posts'> Posts </Link>{' '}
			</li>{' '}
			<li>
				<i className='fas fa-user'> </i>{' '}
				<span className='hide-sm'>
					{' '}
					<Link to='/dashboard'> Dashboard </Link>{' '}
				</span>{' '}
			</li>{' '}
			<li>
				<Link to='/' onClick={logoutFunc} href='#!'>
					<i className='fas fa-sign-out-alt'> </i>{' '}
					<span className='hide-sm'> Log Out </span>{' '}
				</Link>{' '}
			</li>{' '}
		</ul>
	);

	const guestLinks = (
		<ul>
			<li>
				<Link to='/profiles'> Developers </Link>{' '}
			</li>{' '}
			<li>
				<Link to='/register'> Register </Link>{' '}
			</li>{' '}
			<li>
				<Link to='/login'> Login </Link>{' '}
			</li>{' '}
		</ul>
	);
	return (
		<nav className='navbar bg-dark'>
			<h1>
				<Link to='/'>
					<i className='fas fa-code'> </i> DevConnector{' '}
				</Link>{' '}
			</h1>{' '}
			{!loading && (
				<Fragment> {isAuthenticated ? authLinks : guestLinks} </Fragment>
			)}{' '}
		</nav>
	);
};

export default Navbar;
