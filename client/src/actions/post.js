import axios from 'axios';
import { setAlert } from './alert';
import { GET_POSTS, POSTS_ERROR, UPDATE_LIKES } from '../constants/actionTypes';

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