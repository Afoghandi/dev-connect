import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = () => {
	const dispatch = useDispatch();
	const post = useSelector((state) => state.post);
	const [text, setText] = useState('');
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(addPost({ text }));
		setText('');
	};
	return (
		<div className='post-form'>
			<div className='bg-primary p'>
				<h3> Leave A Comment </h3>{' '}
			</div>{' '}
			<form className='form my-1' onSubmit={handleSubmit}>
				<textarea
					name='text'
					cols='30'
					rows='5'
					placeholder='Comment on this post'
					value={text}
					onChange={(e) => setText(e.target.value)}
					required
				></textarea>{' '}
				<input type='submit' className='btn btn-dark my-1' value='Submit' />
			</form>{' '}
		</div>
	);
};

export default PostForm;
