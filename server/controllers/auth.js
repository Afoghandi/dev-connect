import jwt from 'jsonwebtoken';
import User from '../models/Users.js';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import config from 'config';

const jwtToken = config.get('jwtSecret');

//@access   Public
export const authUsers = async(req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
};

//@access   Public
export const signin = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        // check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
        }
        // compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
        }
        //return jswonwebtoken
        const payload = {
            user: {
                id: user.id,
            },
        };
        jwt.sign(payload, jwtToken, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            return res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
};