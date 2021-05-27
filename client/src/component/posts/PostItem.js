import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'react-moment';
import { addLike, removeLike, deletePost } from '../../actions/post';

const PostItem = ({
	post: { _id, text, name, avatar, user, likes, comments, date },
}) => {
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	return (
		<div className='post bg-white p-1 my-1'>
			<div>
				<a href='profile.html'>
					<img className='round-img' src={avatar} alt='' />
					<h4>John Doe</h4>
				</a>
			</div>
			<div>
				<p className='my-1'>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint possimus
					corporis sunt necessitatibus! Minus nesciunt soluta suscipit nobis.
					Amet accusamus distinctio cupiditate blanditiis dolor? Illo
					perferendis eveniet cum cupiditate aliquam?
				</p>
				<p className='post-date'>
					Posted on <Moment format='DD/MM/YYYY'>{date}</Moment>
				</p>
				<button
					onClick={(e) => dispatch(addLike(_id))}
					type='button'
					className='btn btn-light'
				>
					<i className='fas fa-thumbs-up' />{' '}
					<span> {likes.length > 0 && <span>{likes.length}</span>}</span>
				</button>
				<button
					type='button'
					className='btn btn-light'
					onClick={(e) => dispatch(removeLike(_id))}
				>
					<i className='fas fa-thumbs-down' />{' '}
				</button>
				<Link to={`/post/${_id}`} className='btn btn-primary'>
					Discussion
					{comments.length > 0 && (
						<span className='comment-count'>{comments.length}</span>
					)}{' '}
				</Link>
				{!auth.loading && user === auth.user._id && (
					<button
						type='button'
						onClick={(e) => dispatch(deletePost(_id))}
						className='btn btn-danger'
					>
						<i className='fas fa-times' />
						{'  '}
					</button>
				)}
			</div>
		</div>
	);
};

export default PostItem;
