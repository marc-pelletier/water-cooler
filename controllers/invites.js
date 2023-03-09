const Tap = require('../models/tap');
const User = require('../models/user');

module.exports = {
  index,
  joinTap
};

function index(req, res, next) {
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
}

function joinTap(req, res, next) {
    if (!req.user) return res.redirect('/')
    Tap.findById(req.params.tapid, (err, tap) => {
        if (!tap.users.join(' - ').includes(req.user._id.toString())) {
            tap.users.push(req.user._id)
            tap.save()
        }
        let inviteIdx = req.user.tInvitesIn.findIndex(invite => invite.toString() == tap._id.toString())
        req.user.tInvitesIn.splice(inviteIdx, 1)
        req.user.save()
        res.redirect('/invites');
    })
}