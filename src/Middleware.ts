const jwt = require('jsonwebtoken');
require('dotenv').config(); 

const JWT_SECRET = process.env.JWT;
// @ts-ignore
const authMiddleware = async (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({
            message: 'Authorization header is missing or incorrect',
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const response = await jwt.verify(token, JWT_SECRET);
        // req.userId = decoded.userId;

        next();
    } catch (err) {
        return res.status(403).json({
            message: 'unauthorized',
        });
    }
};

module.exports = authMiddleware