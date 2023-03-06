const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const User = require('../models/user');
const Message = require('../models/message');

const channelSchema = new Schema({
    name: String,
    msgs: {type: [ObjectId], ref: Message}
}, {timestamps: true})

const tapSchema = new Schema({
    name: String,
    users: {type: [ObjectId], ref: User},
    channels: {type: [channelSchema]}
}, {timestamps: true})

module.exports = mongoose.model("Tap", tapSchema)