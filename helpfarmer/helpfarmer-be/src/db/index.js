require('./Schema/goods');
require('./Schema/user');
require('./Schema/character')
require('./Schema/inviteCode')
const mongoose = require('mongoose');

const connectDB = async () => {
  return new Promise((resolve,reject) => {
    mongoose.connect('mongodb://localhost:27017/helpfarmer');
    mongoose.connection.on('open',()=>{
      console.log('连接数据库成功');
      resolve('')
  })
  })
};

module.exports = connectDB;
