import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';
import gravatar from 'gravatar';
import { validationResult } from 'express-validator';
import User from '../models/Users.js';

const jwtToken = config.get('jwtSecret');

//@access  Public
export const createUser = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
        // check if user exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ errors: [{ msg: 'User already exist' }] });
        }
        //gets users gravatar
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm',
        });
        //encrpt password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user = await User.create({
            name,
            email,
            avatar,
            password: hashedPassword,
        });
        //return jswonwebtoken
        const payload = {
            user: {
                id: user.id,
            },
        };
        jwt.sign(payload, jwtToken, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};