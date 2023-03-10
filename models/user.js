var mongoose = require('mongoose');
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const messageSchema = new Schema({
    body: String,
    author: {type: ObjectId}
}, {timestamps: true}) 

const dmSchema = new Schema({
    user: {type: ObjectId},
    msgs: [messageSchema]
}, {timestamps: true}) 


var userSchema = new Schema({
    gname: String,
    nname: String,
    email: String,
    googleId: String,
    tInvitesIn: {type: [ObjectId]},
    friends: {type: [ObjectId]},
    fInvitesIn: {type: [ObjectId]},
    fInvitesOut: {type: [ObjectId]},
    dms: {type: [dmSchema]}
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);