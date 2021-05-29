import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../loading';
import { getPosts } from '../../actions/post';
import PostItem from './PostItem';
import PostForm from './PostForm';
import './style/posts.css';

const Posts = () => {
	const dispatch = useDispatch();
	const post = useSelector((state) => state.post);
	const { posts, loading } = post;

	useEffect(() => {
		dispatch(getPosts(posts));
	}, [dispatch, posts]);
	return loading ? (
		<Spinner />
	) : (
		<Fragment>
			{' '}
			<h1 className=' large text-primary'>
				Posts
				<p className='lead'>
					<i className='fas fa-user'> </i>Welcome to the community{' '}
				</p>{' '}
			</h1>
			<PostForm />
			<div className='posts'>
				{' '}
				{posts.map((post) => (
					<PostItem key={post.id} post={post} />
				))}{' '}
			</div>{' '}
		</Fragment>
	);
};

export default Posts;
