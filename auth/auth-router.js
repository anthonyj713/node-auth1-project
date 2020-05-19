const express = require('express');

const bcryptjs = require('bcryptjs');

const router = express.Router();

const Users = require('../users/users-model.js');

const { isValid } = require('../users/users-helper.js');

router.post('/register', (req, res) => {
    const credentials = req.body;

    if(isValid(credentials)) {
        const rounds = process.env.BCRYPT_ROUNDS || 8;

        const hash = bcryptjs.hashSync(credentials.password, rounds);

        credentials.password = hash;

        Users.add(credentials)
        .then(user => {
            req.session.loggedIn === true;
            res.status(201).json({
                data: user
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'There was an error registering the user'
            });
        })
    } else {
        res.status(400).json({
            message: 'Please provide a username and password. The password should be alphanumeric'
        });
    };
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if(isValid(req.body)) {
        Users.getBy({ username: username })
        .then(([user]) => {
            if (user && bcryptjs.compareSync(password, user.password)) {
                req.session.loggedIn = true;
                req.session.user = user;
                res.status(200).json({
                    message: "Welcome!"
                });
            } else {
                res.status(200).json({
                    message: 'Invalid credentials'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'There was an error logging in'
            });
        })
    } else {
        res.status(400).json({
            message: 'Please provide a username and password. The password should be alphanumeric'
        });
    };
});

router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                res.status(500).json({
                    message: 'There was a problem logging you out. Please try again.'
                });
            } else {
                res.status(204).end();
            }
        })
    } else {
        res.status(204).end();
    }
});


module.exports = router;