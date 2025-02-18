const mongoose = require('mongoose');
const { getMeta } = require('../utils');

// 文件模型
const fileSchema = new mongoose.Schema({
  fileId: { type: String },
  filename: { type: String }, // 文件名
  filepath: { type: String, required: true }, // 文件路径
  // 元信息（创建时间、更新时间等）
  meta: getMeta(),
});

const imgUrls = mongoose.model('imgUrls', fileSchema);
module.exports = imgUrls;
