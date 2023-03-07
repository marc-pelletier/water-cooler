const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const User = require('./user');
const Message = require('./message');

const channelSchema = new Schema({
    name: String,
    msgs: {type: [ObjectId], ref: Message}
}, {timestamps: true})

const tapSchema = new Schema({
    name: String,
    users: {type: [ObjectId], ref: User},
    channels: {type: [channelSchema]},
    inviteOnly: {type: Boolean, default: false}
}, {timestamps: true})

module.exports = mongoose.model("Tap", tapSchema)