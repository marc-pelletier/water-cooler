var mongoose = require('mongoose');
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const messageSchema = new Schema({
    body: String,
    author: {type: ObjectId}
}, {timestamps: true}) 

var userSchema = new Schema({
    gname: String,
    nname: String,
    email: String,
    googleId: String,
    friends: {type: [ObjectId]},
    fInvitesInc: {type: [ObjectId]},
    fInvitesOut: {type: [ObjectId]},
    dms: {type: [messageSchema]}
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);