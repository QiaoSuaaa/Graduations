const mongoose = require('mongoose');

const { defaultCharacter } = require('../src/helpers/character');
const connectDB = require('../src/db');
const Character = mongoose.model('Character');
connectDB().then(async () => {
  console.log('角色集合初始化开始');
  const res = await Character.insertMany(defaultCharacter);
  console.log('初始化完成');
});
