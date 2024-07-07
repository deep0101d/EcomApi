import jwt from 'jsonwebtoken';

const jwtAuth = (req, res, next) => {
    // 1. Read the token from the header
    const token = req.headers['authorization'];

    // 2. Check if the token is present
    if (!token) {
        return res.status(401).send('Unauthorized');
    }

    // 3. Verify the token
    try {
        const payload = jwt.verify(token, 'secret');
        console.log(payload);
        req.userId=payload.userId
        // 4. If token is valid, proceed to the next middleware
        next();
    } catch (err) {
        // 5. If token is invalid, return error
        res.status(401).send('Unauthorized');
    }
};

export default jwtAuth;
