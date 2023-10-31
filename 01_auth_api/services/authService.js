const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { randomUUID } = require('crypto');
const db = require('../db');
require('dotenv').config();

const saltRounds = 10;


const signInService = async (email, password) => {
    const query = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
    const user = query.rows[0];
    
    if (!user) {
        throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(
        password,
        user.password_hash
    );
    if (!isPasswordValid) {
        throw new Error("Password is not valid");
    }

    const access_token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.TOKEN_TTL }
    );

    return {
        user,
        access_token,
        refresh_token: user.refresh_token
    };   

}

const signUpService = async (email, password) => {
    const query = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
    const user = query.rows[0];    
    if (user) {
        throw new Error('Email in use');
    }

    const password_hash = await bcrypt.hash(password, saltRounds);
    
    const uuid = randomUUID();
    
    const access_token = jwt.sign(
        { id: uuid, email: email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.TOKEN_TTL }
    );
    const refresh_token = jwt.sign(
        { id: uuid, email: email },
        process.env.JWT_SECRET_REFRESH
    );

    const newUser = {    
        id: uuid,
        email,
        password_hash,
        refresh_token
    };

    await db.query(
        `INSERT INTO users (id, email, password_hash, refresh_token) VALUES ($1, $2, $3, $4) RETURNING *`,
        [
            newUser.id,
            newUser.email,
            newUser.password_hash,
            newUser.refresh_token,
        ]
    );
    
    return { user: newUser, access_token, refresh_token };
}

const refreshTokenService = async (refresh_token) => {
    const user = jwt.verify(refresh_token, process.env.JWT_SECRET_REFRESH);

    const query = await db.query(`SELECT * FROM users WHERE email = $1`, [user.email]);
    const dbUser = query.rows[0];

    if (refresh_token !== dbUser.refresh_token) {
        throw new Error('Refresh Token is Invalid');
    }

    const access_token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.TOKEN_TTL }
    );

    return {id: user.id, access_token};
}

module.exports = {
    signInService,
    signUpService,
    refreshTokenService
};