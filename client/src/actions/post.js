import axios from 'axios';
import { setAlert } from './alert';
import {
    DELETE_POST,
    GET_POSTS,
    POSTS_ERROR,
    UPDATE_LIKES,
    ADD_POST,
} from '../constants/actionTypes';

//GET Posts

export const getPosts = () => async(dispatch) => {
    try {
        const res = await axios.get('/posts');
        dispatch({
            type: GET_POSTS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: POSTS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

//ADD Like

export const addLike = (id) => async(dispatch) => {
    try {
        const res = await axios.put(`posts/like/${id}`);
        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data },
        });
    } catch (err) {
        dispatch({
            type: POSTS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

//Remove Like

export const removeLike = (id) => async(dispatch) => {
    try {
        const res = await axios.put(`posts/unlike/${id}`);
        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data },
        });
    } catch (err) {
        dispatch({
            type: POSTS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

//Delete Like

export const deletePost = (id) => async(dispatch) => {
    try {
        await axios.delete(`posts/${id}`);
        dispatch({
            type: DELETE_POST,
            payload: id,
        });
        dispatch(setAlert('Post Removed', 'success'));
    } catch (err) {
        dispatch({
            type: POSTS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

//ADD Post

export const addPost = (formData) => async(dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    try {
        const res = await axios.post(`/posts`, formData, config);
        dispatch({
            type: ADD_POST,
            payload: res.data,
        });
        dispatch(setAlert('Post Created', 'success'));
    } catch (err) {
        dispatch({
            type: POSTS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};