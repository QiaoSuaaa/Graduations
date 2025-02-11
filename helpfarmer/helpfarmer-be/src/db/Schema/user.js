const mongoose = require('mongoose');
const { getMeta } = require('../utils');
const { DEFAULT_PASSWORD } = require('../../projectConfig');
const usersSchema = new mongoose.Schema({
  name: { type: String },

  account: { type: String, required: true },

  password: { type: String, required: true },
  character: { type: String, required: true },

  city: { type: String },

  age: { type: Number },

  sex: { type: String },

  email: { type: String },
  active: { type: Boolean, default: true },
  meta: getMeta(),
});

const Users = mongoose.model('Users', usersSchema);

module.exports = Users;
