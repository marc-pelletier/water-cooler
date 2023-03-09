const Tap = require('../models/tap');
const User = require('../models/user');

module.exports = {
  index,
  new: newInvite,
  create
};

function index(req, res, next) {
    if (!req.user) return res.redirect('/')
    let selectedUser = req.params.userid
    Tap.find({}, (err, taps) => {
        User.find({}, (err, users) => {
            taps = taps.filter(tap => tap.users.join(' - ').includes(req.user._id.toString()))
            res.render('users/index', { user: req.user, taps, selectedTap: null, selectedChannel: null, users, selectedUser });
        })
    })
}

function newInvite(req, res, next) {
    if (!req.user) return res.redirect('/')
    let selectedUser = req.params.userid
    Tap.find({}, (err, taps) => {
        User.findById(req.params.userid, (err, selectedUser) => {
            taps = taps.filter(tap => tap.users.join(' - ').includes(req.user._id.toString()))
            inviteTaps = taps.filter(tap => !tap.users.join(' - ').includes(req.params.userid))
            res.render('users/invite', { user: req.user, taps, selectedTap: null, selectedChannel: null, selectedUser, inviteTaps, selectedUser });
        })
    })
}

function create(req, res, next) {
    if (!req.user) return res.redirect('/')
    User.findById(req.params.userid, (err, user) => {
        Tap.findById(req.params.tapid, (err, tap) => {
            if (!tap.users.join(' - ').includes(req.params.userid)) {
                user.tInvitesIn.push(req.params.tapid)
                user.save()
            }
        })
    })
    res.redirect('/users/'+req.params.userid+'/invite')
}