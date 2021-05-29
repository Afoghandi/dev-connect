import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../loading';
import PostItem from '../posts/PostItem';
import { getPost } from '../../actions/post';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
const Post = ({ match }) => {
	const dispatch = useDispatch();
	const statePost = useSelector((state) => state.post);
	const { post, loading } = statePost;

	useEffect(() => {
		dispatch(getPost(match.params.id));
	}, [dispatch]);
	return loading || post === null ? (
		<Spinner />
	) : (
		<Fragment>
			<Link to='/posts' className='btn'>
				{' '}
				Back To Posts
			</Link>{' '}
			<PostItem post={post} showActions={false} />
			<CommentForm postId={post._id} />
			{post.comments.map((comment) => (
				<CommentItem key={comment._id} comment={comment} postId={post._id} />
			))}
		</Fragment>
	);
};

export default Post;
