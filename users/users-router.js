const express = require('express');

const Users = require('./users-model.js');

const router = express.Router();

function restricted(req, res, next) {
    if(req.session && req.session.loggedIn) {
        next();
    } else {
        res.status(401).json({ message: "ACCESS DENIED!!"})
    }
}

// router.use(restricted);

router.get('/', (req, res) => {
    Users.get()
    .then(users => {
        res.json(users);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'Cannot view users list'
        })
    })
})

module.exports = router;