var express = require('express');
var router = express.Router();
const passport = require('passport');
const Tap = require('../../models/tap');
const User = require('../../models/user');


router.get('/', function(req, res, next) {
    if (!req.user) return res.redirect('/')
    Tap.find({}, (err, taps) => {
        User.find({}, (err, users) => {
            taps = taps.filter(tap => tap.users.join(' - ').includes(req.user._id.toString()))
            res.render('users/index', { user: req.user, taps, selectedTap: null, selectedChannel: null, users });
        })
    })
});

router.get('/:userid/invite', function(req, res, next) {
    if (!req.user) return res.redirect('/')
    Tap.find({}, (err, taps) => {
        User.findById(req.params.userid, (err, selectedUser) => {
            taps = taps.filter(tap => tap.users.join(' - ').includes(req.user._id.toString()))
            inviteTaps = taps.filter(tap => !tap.users.join(' - ').includes(req.params.userid))
            res.render('users/invite', { user: req.user, taps, selectedTap: null, selectedChannel: null, selectedUser, inviteTaps });
        })
    })
});

router.post('/:userid/invite/:tapid', function(req, res, next) {
    if (!req.user) return res.redirect('/')
    User.findById(req.params.userid, (err, user) => {
        Tap.findById(req.params.tapid, (err, user) => {
            if (!tap.users.join(' - ').includes(req.params.userid)) {
                user.tInvitesIn.push(req.params.tapid)
                user.save()
            }
        })
    })
    res.redirect('/users/'+req.params.userid+'/invite')
});

module.exports = router;