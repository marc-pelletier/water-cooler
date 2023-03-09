const Tap = require('../models/tap');
const User = require('../models/user');

module.exports = {
  index,
  update
};

function index(req, res, next) {
    if (!req.user) return res.redirect('/')
    Tap.find({}, (err, indexTaps) => {
        taps = indexTaps.filter(tap => tap.users.join(' - ').includes(req.user._id.toString()))
        res.render('usersettings/index', { user: req.user, taps, selectedTap: null, selectedChannel: null });
    })
}

function update(req, res, next) {
    if (!req.user) return res.redirect('/')
    req.body.nname != "" ? req.user.nname = req.body.nname : req.user.nname = req.user.nname
    req.user.save();
    res.redirect('/home');
}