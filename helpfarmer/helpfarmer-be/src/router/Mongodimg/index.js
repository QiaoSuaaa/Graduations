const Router = require('@koa/router');
const fs = require('fs');
const mongoose = require('mongoose');
const connectDB = require('../../db/index');
const Grid = require('gridfs-stream');

const uploadRouter = new Router();
// 连接到 MongoDB 数据库
let gfs;
connectDB().then((gfsInstance) => {
  gfs = gfsInstance;

  // 上传文件的路由
  uploadRouter.post('/upload', async (ctx) => {
    const file = ctx.request.files.file; // 获取上传的文件

    if (!file) {
      return ctx.throw(400, 'No file uploaded');
    }

    // 使用 GridFS 存储图片
    const writestream = gfs.createWriteStream({
      filename: file.name,
      content_type: file.type,
    });

    // 将文件数据写入到 MongoDB
    const fileStream = fs.createReadStream(file.path);
    fileStream.pipe(writestream);

    writestream.on('close', (uploadedFile) => {
      // 返回文件 ID 和访问 URL
      ctx.body = {
        fileId: uploadedFile._id,
        fileUrl: `http://localhost:3000/file/${uploadedFile._id}`,
      };
    });

    writestream.on('error', (err) => {
      ctx.throw(500, 'Failed to upload file', err);
    });
  });
});

module.exports = uploadRouter;
