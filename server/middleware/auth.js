import jwt from 'jsonwebtoken';
import config from 'config';

const jwtToken = config.get('jwtSecret');
const auth = async(req, res, next) => {
    //get token from header

    const token = req.header('x-auth-token');

    if (!token) {
        res.status(401).json({ msg: 'no token, authorization denied' });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, jwtToken);
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

export default auth;

/* const isCustomAuth = token;

    let decoded;
    if (!token && isCustomAuth) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    //verify token
    try {
        if (token && isCustomAuth) {
            decoded = jwt.verify(token, jwtToken);
            req.user = decoded.user;
        } else {
            decoded = jwt.decode(token);
            req.user = decoded.sub;
        }
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};*/