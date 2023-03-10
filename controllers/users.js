const Tap = require('../models/tap');
const User = require('../models/user');

module.exports = {
  index,
  new: newInvite,
  create,
  show,
  invite,
  delete: deleteMessage
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

function show(req, res, next) {
    if (!req.user) return res.redirect('/')
    Tap.find({}, (err, taps) => {
        User.find({}, (err, users) => {
            User.findById(req.params.userid, (err, selectedUser) => {
                let dms = req.user.dms.find(dm => dm.user.toString() == selectedUser._id.toString())
                if (dms != undefined) msgs = dms.msgs
                else msgs = null
                res.render('users/show', { user: req.user, taps, selectedTap: null, selectedChannel: null, selectedUser, msgs, users });
            })
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

function invite(req, res, next) {
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

function create(req, res, next) {
    if (!req.user) return res.redirect('/')
    User.findById(req.params.userid, (err, user) => {
        if (req.body.body != "") {
            req.body.author = req.user._id;
            if (req.user.dms.find(dm => dm.user.toString() == user._id.toString()) == undefined) {
                let dm0 = {
                    user: user._id,
                    msgs: []
                }
                dm0.msgs.push({author: req.user._id, body: req.body.body})
                req.user.dms.push(dm0)

                let dm1 = {
                    user: req.user._id,
                    msgs: []
                }
                dm1.msgs.push({author: req.user._id, body: req.body.body})
                user.dms.push(dm1)

                user.save()
                req.user.save()
            }
            else {
                console.log("We are in dm1")
                let dm0 = user.dms.find(dm => dm.user.toString() == req.user._id.toString())
                console.log(dm0)
                dm0.msgs.push({author: req.user._id, body: req.body.body})
                let dm1 = req.user.dms.find(dm => dm.user.toString() == user._id.toString())
                dm1.msgs.push({author: req.user._id, body: req.body.body})
                user.save()
                req.user.save()
            }
        }
    })
    res.redirect('/users/'+req.params.userid)
}

function deleteMessage(req, res, next) {
    if (!req.user) return res.redirect('/')
    User.findById(req.params.userid, (err, user) => {
        let dm = user.dms.find(dm => dm.user.toString() == req.user._id.toString())
        let msgIdx = dm.msgs.findIndex(msg => msg._id == req.params.msgid)
        dm.msgs.splice(msgIdx, 1)
        user.save()

        dm = req.user.dms.find(dm => dm.user.toString() == user._id.toString())
        msgIdx = dm.msgs.findIndex(msg => msg._id == req.params.msgid)
        dm.msgs.splice(msgIdx, 1)
        req.user.save()
    })
    res.redirect('/users/'+req.params.userid);
}