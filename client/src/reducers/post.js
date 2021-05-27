/* eslint-disable default-case */
/* eslint-disable import/no-anonymous-default-export */

import { GET_POSTS, POSTS_ERROR } from '../constants/actionTypes';

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
        case POSTS_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            };
        default:
            return state;
    }
}