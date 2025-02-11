const mongoose = require('mongoose');
const { getMeta } = require('../utils');
// 定义商品表的 Schema
const goodsSchema = new mongoose.Schema({
  // 商品名称
  name: { type: String, required: true },
  // 描述
  description: { type: String, required: true },

  // 生产地
  city: { type: String, required: true },

  // 价格
  price: { type: Number, required: true },

  // 厂商
  production: { type: String, required: true },
  //数量
  count: { type: Number, required: true },

  // 是否上架
  flag: { type: Boolean, default: true },

  // 操作 (在表格中展示删除操作等)
  // 这可以是一个方法或者其他字段，这里暂时忽略
  active: { type: Boolean, default: true },

  // 新增的字段，方便进行排序或者分组等操作},
  //元信息
  meta:getMeta()
});

// 创建 goods 模型
const Goods = mongoose.model('Goods', goodsSchema);

module.exports = Goods;
