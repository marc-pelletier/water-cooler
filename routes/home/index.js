var express = require('express');
var router = express.Router();
const passport = require('passport');
const Tap = require('../../models/tap');
const User = require('../../models/user');


router.get('/', function(req, res, next) {
    if (!req.user) return res.redirect('/')
    Tap.find({}, (err, taps) => {
        taps = taps.filter(tap => tap.users.join(' - ').includes(req.user._id.toString()))
        res.render('home/index', { user: req.user, taps, selectedTap: null, selectedChannel: null, users: null });
    })
});

router.get('/new', function(req, res, next) {
    if (!req.user) return res.redirect('/')
    res.render('home/new', { user: req.user });
});

router.get('/:tapid/channels/new', function(req, res, next) {
    if (!req.user) return res.redirect('/')
    res.render('channels/new', { user: req.user, tapId: req.params.tapid });
});

router.get('/:tapid', function(req, res, next) {
    if (!req.user) return res.redirect('/')
    Tap.find({}, (err, taps) => {
        Tap.findById(req.params.tapid, (err, selectedTap) => {
            let userlist = selectedTap.users.join(" - ")
            User.find({}, (err, users) => {
                users = users.map(user => {
                    if (userlist.includes(user._id.toString())) return user;
                    else return;
                })
                taps = taps.filter(tap => tap.users.join(' - ').includes(req.user._id.toString()))
                res.render('home/index', { user: req.user, taps, selectedTap, selectedChannel: null, users});
            })
        })
    })
});

router.get('/:tapid/channels/:chanid', function(req, res, next) {
    console.log(req.params)
    if (!req.user) return res.redirect('/')
    Tap.find({}, (err, taps) => {
        Tap.findById(req.params.tapid, (err, selectedTap) => {
            let userlist = selectedTap.users.join(" - ")
            User.find({}, (err, users) => {
                users = users.map(user => {
                    if (userlist.includes(user._id.toString())) return user;
                    else return;
                })
                console.log(selectedTap.channels.find(channel => channel._id == req.params.chanid));
                let selectedChannel = selectedTap.channels.find(channel => channel._id == req.params.chanid);
                taps = taps.filter(tap => tap.users.join(' - ').includes(req.user._id.toString()))
                res.render('home/index', { user: req.user, taps, selectedTap, selectedChannel, users});
            })
        })
    })
});

router.post('/:tapid/channels/:chanid', function(req, res, next) {
    if (!req.user) return res.redirect('/')
    Tap.findById(req.params.tapid, (err, tap) => {
        let channel = tap.channels.find(channel => channel._id == req.params.chanid)
        if (req.body.body != "") {
        req.body.author = req.user._id;
        channel.msgs.push(req.body);
        tap.save();
        }
    })
    res.redirect('/home/'+req.params.tapid+'/channels/'+req.params.chanid);
});

router.post('/:tapid', function(req, res, next) {
    if (!req.user) return res.redirect('/')
    Tap.findById(req.params.tapid, (err, tap) => {
        tap.channels.push(req.body);
        tap.save();
    })
    res.redirect('/home/'+req.params.tapid);
});

router.post('/', function(req, res, next) {
    if (!req.user) return res.redirect('/')
    var tap = new Tap({
      name: req.body.name,
      users: [req.user._id]
    });
    tap.save();
    res.redirect('/home');
});

module.exports = router;