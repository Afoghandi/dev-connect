import { validationResult } from 'express-validator';
import Post from '../models/Post.js';
import Profile from '../models/Profile.js';
import User from '../models/Users.js';

//@desc    Create a post
//@access  Private

export const createPosts = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = await User.findById(req.user.id).select('-password');
        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id,
        });
        const post = await newPost.save();
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

//@desc    Get all posts
//@access  Private

export const getAllPosts = async(req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

//@desc    Get post by id
//@access  Private

export const getPostById = async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.json(post);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' });
        }
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

//@desc    Delete a post
//@access  Private

export const deletePost = async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        // Check user
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        await post.remove();
        res.json({ msg: 'Post removed' });
        res.json(post);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' });
        }
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

//@desc   Like a post
//@access  Private

export const likePosts = async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        //Check if post has been liked
        if (
            post.likes.filter((like) => like.user.toString() === req.user.id).length >
            0
        ) {
            return res.status(400).json({ msg: 'Post already liked by you' });
        }
        post.likes.unshift({ user: req.user.id });
        await post.save();
        res.json(post.likes);
    } catch (err) {
        console.error(err.message);

        res.status(500).send('Server Error');
    }
};

//@desc   UbLike a post
//@access  Private

export const unlikePosts = async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        //Check if post has been liked
        if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
            .length === 0
        ) {
            return res.status(400).json({ msg: 'Post has not yet been liked' });
        }
        //Get remove index

        const removeIndex = post.likes
            .map((like) => like.user.toString())
            .indexOf(req.user.id);

        post.likes.splice(removeIndex, 1);
        await post.save();
        res.json(post.likes);
    } catch (err) {
        console.error(err.message);

        res.status(500).send('Server Error');
    }
};

//@desc    Create a comment
//@access  Private

export const createComment = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = await User.findById(req.user.id).select('-password');

        const post = await Post.findById(req.params.id);
        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id,
        };

        post.comments.unshift(newComment);
        await post.save();
        res.json(post.comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

export const deleteComment = async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        //Pull out comment
        const comment = post.comments.find(
            (comment) => comment.id === req.params.comment_id
        );

        //Make sure comments exists
        if (!comment) {
            return res.status(404).json({ msg: 'Comment does not exist' });
        }

        //Check user
        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorised' });
        }

        //Get remove Index
        const removeIndex = post.comments
            .map((comment) => comment.user.toString())
            .indexOf(req.user.id);

        post.comments.splice(removeIndex, 1);
        await post.save();

        res.json(post.comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};