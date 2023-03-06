const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const User = require('../models/user');

const messageSchema = new Schema({
    body: String,
    author: {type: [ObjectId], ref: User}
}, {timestamps: true}) 

module.exports = mongoose.model("Message", messageSchema)