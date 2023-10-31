require('dotenv').config();
const jwt = require('jsonwebtoken');
const { userSchema, refreshTokenSchema } = require('../schemas/schemas');


const authValidation = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).json({
                success: false,
                error: 'Please, provide a token in request authorization header',
            });            
        }

        const [, token] = authorization.split(' ');
        if (!token) {
            return res.status(401).json({
                success: false,
                error: 'Please, provide a token',
            });            
        }

        const userAuth = jwt.verify(token, process.env.JWT_SECRET);
        req.userInfo = userAuth;
        next();

    } catch (error) {
        return res.status(403).json({
            success: false,
            error: "Invalid token",
        });
    }
};

const userParamsValidation = async (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: "400 Bad Request",
            message: error.details,
        });
    }

    next();
};

const tokenValidation = async (req, res, next) => {
    const { error } = refreshTokenSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
        success: "400 Bad Request",
        message: error.details,
        });
    }

    next();
};

module.exports = {
    authValidation,
    userParamsValidation,
    tokenValidation
}