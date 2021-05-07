import express from 'express';
import { check } from 'express-validator';
import auth from '../middleware/auth.js';
import {
    createPosts,
    getAllPosts,
    getPostById,
    deletePost,
    likePosts,
    unlikePosts,
    createComment,
    deleteComment,
} from '../controllers/posts.js';
const router = express.Router();

//@route   POST localhost:5000/posts
router.post(
    '/', [auth, [check('text', 'Text is required').not().isEmpty()]],
    createPosts
);

//@route   GET localhost:5000/posts

router.get('/', auth, getAllPosts);

//@route   GET localhost:5000/posts/:id

router.get('/:id', auth, getPostById);

//@route   GET localhost:5000/posts/:id

router.delete('/:id', auth, deletePost);

//@route   PUT localhost:5000/posts/like/:id
router.put('/like/:id', auth, likePosts);

//@route   PUT localhost:5000/posts/unlike/:id
router.put('/unlike/:id', auth, unlikePosts);

//@route   POST localhost:5000/posts/comment/:id
router.post(
    '/comment/:id', [auth, [check('text', 'Text is required').not().isEmpty()]],
    createComment
);

//@route   DELETE localhost:5000/posts/comment/:id/:comment_id

router.delete('/comment/:id/:comment_id', auth, deleteComment);
export default router;