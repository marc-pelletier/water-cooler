var express = require('express');
var router = express.Router();
const passport = require('passport');
const Tap = require('../../models/tap');
const User = require('../../models/user');


router.get('/', function(req, res, next) {
    if (!req.user) return res.redirect('/')
    Tap.find({}, (err, taps) => {
        User.find({}, (err, users) => {
            res.render('users/index', { user: req.user, taps, selectedTap: null, selectedChannel: null, users });
        })
    })
});

router.get('/:userid', function(req, res, next) {
});

module.exports = router;