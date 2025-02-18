require('./Schema/goods');
require('./Schema/user');
require('./Schema/character');
require('./Schema/inviteCode');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream'); // 引入 GridFS 模块

let gfs; // GridFS 对象

const connectDB = async () => {
  return new Promise((resolve, reject) => {
    mongoose.connect('mongodb://localhost:27017/helpfarmer')
      .then(() => {
        console.log('连接数据库成功');
        const conn = mongoose.connection;
        conn.once('open', () => {
          // 初始化 GridFS
          gfs = Grid(conn.db, mongoose.mongo);
          gfs.collection('uploads'); // 设置文件集合
          resolve(gfs);
        });
      })
      .catch((err) => {
        console.error('数据库连接失败:', err);
        reject(err);
      });
  });
};

module.exports = connectDB;
