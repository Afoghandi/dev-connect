import express from 'express';
import { check } from 'express-validator';
import { authUsers, signin } from '../controllers/auth.js';
import auth from '../middleware/auth.js';

const router = express.Router();

//@route    GET localhost:5000/auth
router.get('/', auth, authUsers);

//@route    POST localhost:5000/auth
router.post(
    '/', [
        check('email', 'Please include a valid email').isEmail(),

        check('password', 'Please is required').exists(),
    ],

    signin
);

export default router;