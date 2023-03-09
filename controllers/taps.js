const Tap = require('../models/tap');
const User = require('../models/user');

module.exports = {
  index,
  joinTap
};

function index(req, res, next) {
    if (!req.user) return res.redirect('/')
    Tap.find({}, (err, indexTaps) => {
        taps = indexTaps.filter(tap => tap.users.join(' - ').includes(req.user._id.toString()))
        res.render('taps/index', { user: req.user, taps, selectedTap: null, selectedChannel: null, indexTaps});
    })
}

function joinTap(req, res, next) {
    if (!req.user) return res.redirect('/')
    Tap.findById(req.params.tapid, (err, tap) => {
        if (!tap.users.join(' - ').includes(req.user._id.toString())) {
            tap.users.push(req.user._id)
            tap.save()
        }
        res.redirect('/taps');
    })
}