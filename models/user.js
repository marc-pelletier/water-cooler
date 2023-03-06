var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    gname: String,
    nname: String,
    email: String,
    googleId: String,
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);