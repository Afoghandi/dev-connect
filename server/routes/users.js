import express from 'express';
import { check } from 'express-validator';
import { createUser } from '../controllers/user.js';

const router = express.Router();

//@route   POST localhost:5000/users
router.post(
    '/', [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check(
            'password',
            'Please enter a password that is 6 or more characters'
        ).isLength({
            min: 6,
        }),
    ],
    createUser
);

export default router;