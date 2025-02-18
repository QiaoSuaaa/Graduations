const multer = require('@koa/multer');
const koaStatic = require('koa-static');

const path = require('path');
const { v4: uuidv4 } = require('uuid');

//设置multer 中间件
const storage = multer.diskStorage({
  //图片保存目录
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads/goods');
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // 生成唯一的文件名
    const ext = path.extname(file.originalname);
    const fileName = `${uuidv4()}${ext}`;
    cb(null, fileName);
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = {
  upload,
};
