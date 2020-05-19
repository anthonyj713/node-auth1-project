const express = require('express');
const session = require('express-session');

const server = express();

const usersRouter = require('../users/users-router.js');
const authRouter = require('../auth/auth-router.js');

server.use(express.json());

const sessionConfig = {
    cookie: {
        maxAge: 1000 * 60 * 60 * 2,
        secure: process.env.SECURE_COOKIE || false,
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: process.env.USER_ALLOWED_COOKIES || true,
    name: 'testName',
    secret: process.env.COOKIE_SECRET || 'secret'
};

server.use(session(sessionConfig));
server.use('/api/users', usersRouter);
server.use('api/auth', authRouter);

server.get('/', (req, res) => {
    res.json({ api: 'up' });
});

module.exports = server;