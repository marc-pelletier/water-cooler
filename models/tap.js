const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const User = require('./user');

const messageSchema = new Schema({
    body: String,
    author: {type: ObjectId, ref: "User"}
}, {timestamps: true}) 

const channelSchema = new Schema({
    name: String,
    msgs: {type: [messageSchema]}
}, {timestamps: true})

const tapSchema = new Schema({
    name: String,
    users: {type: [ObjectId], ref: "User"},
    channels: {type: [channelSchema]},
    inviteOnly: {type: Boolean, default: false}
}, {timestamps: true})

module.exports = mongoose.model("Tap", tapSchema)