const Tap = require('../models/tap');
const User = require('../models/user');

module.exports = {
  index,
  new: newTap,
  newChannel,
  show,
  showChannel,
  delete: deleteMessage,
  createMessage,
  createChannel,
  create
};


function index(req, res, next) {
    if (!req.user) return res.redirect('/')
    Tap.find({}, (err, taps) => {
        taps = taps.filter(tap => tap.users.join(' - ').includes(req.user._id.toString()))
        res.render('home/index', { user: req.user, taps, selectedTap: null, selectedChannel: null, users: null });
    })
}

function newTap(req, res, next) {
    if (!req.user) return res.redirect('/')
    res.render('home/new', { user: req.user });
}

function newChannel(req, res, next) {
    if (!req.user) return res.redirect('/')
    res.render('channels/new', { user: req.user, tapId: req.params.tapid });
}

function show(req, res, next) {
    if (!req.user) return res.redirect('/')
    Tap.find({}, (err, taps) => {
        Tap.findById(req.params.tapid, (err, selectedTap) => {
            let userlist = selectedTap.users.join(" - ")
            User.find({}, (err, users) => {
                users = users.filter(user => (userlist.includes(user._id.toString())))
                taps = taps.filter(tap => tap.users.join(' - ').includes(req.user._id.toString()))
                res.render('home/index', { user: req.user, taps, selectedTap, selectedChannel: null, users});
            })
        })
    })
}

function showChannel(req, res, next) {
    console.log(req.params)
    if (!req.user) return res.redirect('/')
    Tap.find({}, (err, taps) => {
        Tap.findById(req.params.tapid, (err, selectedTap) => {
            let userlist = selectedTap.users.join(" - ")
            User.find({}, (err, users) => {
                users = users.filter(user => (userlist.includes(user._id.toString())))
                let selectedChannel = selectedTap.channels.find(channel => channel._id == req.params.chanid);
                taps = taps.filter(tap => tap.users.join(' - ').includes(req.user._id.toString()))
                res.render('home/index', { user: req.user, taps, selectedTap, selectedChannel, users});
            })
        })
    })
}

function deleteMessage(req, res, next) {
    if (!req.user) return res.redirect('/')
    Tap.findById(req.params.tapid, (err, tap) => {
        let channel = tap.channels.find(channel => channel._id == req.params.chanid)
        let msgIdx = channel.msgs.findIndex(msg => msg._id == req.params.msgid)
        channel.msgs.splice(msgIdx, 1);
        tap.save();
    })
    res.redirect('/home/'+req.params.tapid+'/channels/'+req.params.chanid);
}

function createMessage(req, res, next) {
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
}

function createChannel(req, res, next) {
    if (!req.user) return res.redirect('/')
    Tap.findById(req.params.tapid, (err, tap) => {
        tap.channels.push(req.body);
        tap.save();
    })
    res.redirect('/home/'+req.params.tapid);
}

function create(req, res, next) {
    if (!req.user) return res.redirect('/')
    var tap = new Tap({
      name: req.body.name,
      users: [req.user._id]
    });
    tap.save();
    res.redirect('/home');
}