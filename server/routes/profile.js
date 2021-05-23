import express from 'express';
import auth from '../middleware/auth.js';
import { check } from 'express-validator';
import {
    usersProfile,
    createProfile,
    getAllProfiles,
    getByUserId,
    deleteProfile,
    addProfileExperience,
    deleteProfileExperience,
    addProfileEducation,
    deleteProfileEducation,
    getGithubUser,
} from '../controllers/profile.js';
const router = express.Router();

//@route   Get localhost:5000/me
router.get('/me', auth, usersProfile);

//@route   POST localhost:5000/profile
router.post(
    '/', [
        auth, [
            check('status', 'Status is required').not().isEmpty(),
            check('skills', 'Skills is required').not().isEmpty(),
        ],
    ],
    createProfile
);

//@route   POST localhost:5000/profile
router.get('/', getAllProfiles);

//@route   POST localhost:5000/profile/user/:user_id

router.get('/user/:user_id', getByUserId);

//@route   POST localhost:5000/profile/
router.delete('/', auth, deleteProfile);

//@route   POST localhost:5000/profile/experience

router.put(
    '/experience', [
        auth, [
            check('title', 'Title is required').not().isEmpty(),
            check('company', 'Company is required').not().isEmpty(),
            check('from', 'From date is required').not().isEmpty(),
        ],
    ],
    addProfileExperience
);

//@route   DELETE localhost:5000/profile/experience/:exp_id
router.delete('/experience/:exp_id', auth, deleteProfileExperience);

//@route   POST localhost:5000/profile/education

router.put(
    '/education', [
        auth, [
            check('school', 'School is required').not().isEmpty(),
            check('degree', 'Degree is required').not().isEmpty(),
            check('fieldofstudy', 'Field of study is required').not().isEmpty(),
            check('from', 'From date is required').not().isEmpty(),
        ],
    ],
    addProfileEducation
);

//@route   DELETE localhost:5000/profile/education/:exp_id
router.delete('/education/:exp_id', auth, deleteProfileEducation);

//@route   GET localhost:5000/profile/github/:username

router.get('/github/:username', getGithubUser);

export default router;