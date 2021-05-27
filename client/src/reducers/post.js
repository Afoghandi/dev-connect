/* eslint-disable default-case */
/* eslint-disable import/no-anonymous-default-export */

import {
    GET_POSTS,
    POSTS_ERROR,
    UPDATE_LIKES,
    DELETE_POST,
} from '../constants/actionTypes';

const initialState = {
    posts: [],
    post: null,
    loading: true,
    error: {},
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false,
            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter((post) => post._id !== payload),
                loading: false,
            };

        case POSTS_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            };
        case UPDATE_LIKES:
            return {
                ...state,
                posts: state.posts.map((post) =>
                    post._id === payload.id ? {...post, likes: payload.likes } : post
                ),
                loading: false,
            };
        default:
            return state;
    }
}