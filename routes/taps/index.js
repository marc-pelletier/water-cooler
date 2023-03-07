var express = require('express');
var router = express.Router();
const passport = require('passport');
const Tap = require('../../models/tap');
const User = require('../../models/user');


router.get('/', function(req, res, next) {
    if (!req.user) res.redirect('/')
    Tap.find({}, (err, taps) => {
        res.render('taps/index', { user: req.user, taps, selectedTap: null, selectedChannel: null, channelId: null, users: null });
    })
});

router.get('/new', function(req, res, next) {
    if (!req.user) res.redirect('/')
    res.render('taps/new', { user: req.user });
});

router.get('/:tapid/channels/new', function(req, res, next) {
    if (!req.user) res.redirect('/')
    res.render('channels/new', { user: req.user, tapId: req.params.tapid, channelId: null });
});

router.get('/:tapid', function(req, res, next) {
    if (!req.user) res.redirect('/')
    Tap.find({}, (err, taps) => {
        Tap.findById(req.params.tapid, (err, selectedTap) => {
            let userlist = selectedTap.users.join(" - ")
            User.find({}, (err, users) => {
                users = users.map(user => {
                    console.log(user._id)
                    if (userlist.includes(user._id)) return user;
                    else return;
                })
                res.render('taps/index', { user: req.user, taps, selectedTap, channelId: null, users});
            })
        })
    })
});

router.get('/:tapid/channels/:chanid', function(req, res, next) {
    console.log(req.params)
    if (!req.user) res.redirect('/')
    Tap.find({}, (err, taps) => {
        Tap.findById(req.params.tapid, (err, selectedTap) => {
            res.render('taps/index', { user: req.user, taps, selectedTap, channelId: req.params.chanid});
        })
    })
});

router.post('/:tapid', function(req, res, next) {
    if (!req.user) res.redirect('/')
    Tap.findById(req.params.tapid, (err, tap) => {
        tap.channels.push(req.body);
        tap.save();
    })
    res.redirect('/taps/'+req.params.tapid);
});

router.post('/', function(req, res, next) {
    if (!req.user) res.redirect('/')
    var tap = new Tap({
      name: req.body.name,
      users: [req.user._id]
    });
    tap.save();
    res.redirect('/taps');
});

module.exports = router;