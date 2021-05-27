import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../loading';
import { getPosts } from '../../actions/post';
import PostItem from './PostItem';

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
			<h1 className='large text-primary'>
				Posts
				<p className='lead'>
					<i className='fa-user'></i>Welcome to the community{' '}
				</p>
				<div className='posts'>
					{posts.map((post) => (
						<PostItem key={post.id} post={post} />
					))}
				</div>
			</h1>
		</Fragment>
	);
};

export default Posts;
