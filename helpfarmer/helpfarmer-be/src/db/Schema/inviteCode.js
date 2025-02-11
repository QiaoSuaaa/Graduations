const mongoose = require('mongoose');
const { getMeta } = require('../utils')
const inviteCodeSchema = new mongoose.Schema({
    user:String,
    code:String,
    // 元信息
    meta: getMeta()
})

mongoose.model('inviteCode',inviteCodeSchema)