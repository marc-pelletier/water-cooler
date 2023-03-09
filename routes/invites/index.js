var express = require('express');
var router = express.Router();
const passport = require('passport');
const Tap = require('../../models/tap');
const User = require('../../models/user');


router.get('/', function(req, res, next) {
    if (!req.user) return res.redirect('/')
    Tap.find({}, (err, indexTaps) => {
        let taps = indexTaps.filter(tap => tap.users.join(' - ').includes(req.user._id.toString()))
        let tapInvites = [];
        indexTaps.forEach(tap => {
            if (req.user.tInvitesIn.join(' - ').includes(tap._id.toString())) {
                tapInvites.push(tap)
            }
        });
        res.render('invites/index', { user: req.user, taps, selectedTap: null, selectedChannel: null, tapInvites});
    })
});

router.post('/:tapid', function(req, res, next) {
    if (!req.user) return res.redirect('/')
    Tap.findById(req.params.tapid, (err, tap) => {
        if (!tap.users.join(' - ').includes(req.user._id.toString())) {
            tap.users.push(req.user._id)
            tap.save()
        }
        res.redirect('/invites');
    })
});

module.exports = router;