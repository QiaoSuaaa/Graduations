
const mongoose = require('mongoose');
const { getMeta } = require('../utils');

// 定义商品表的 Schema（助农商品）
const goodsSchema = new mongoose.Schema({
  // 商品名称（例如：有机大米、新鲜苹果）
  name: { type: String, required: true },
  
  // 商品描述（例如：产地、种植方式、营养价值）
  description: { type: String, required: true },
  
  // 商品图片（展示商品的真实情况）
  images: [{ type: String }],
  
  // 生产地（例如：某省某市某村）
  city: { type: String, required: true },
  
  // 商品价格（助农价格，单位为元）
  price: { type: Number, required: true },
  
  // 农户信息（发布该商品的农户）
  farmer: { type: String },
  
  // 商品库存数量
  count: { type: Number, required: true },
  
  // 商品分类（例如：水果、蔬菜、粮食）
  category: { type: String},
  
  // 是否上架（默认上架）
  flag: { type: Boolean, default: true },
  
  // 是否可用（用于软删除）
  active: { type: Boolean, default: true },
  
  // 商品认证信息（例如：有机认证、绿色食品认证）
  certification: { type: String },
  
  // 元信息（创建时间、更新时间等）
  meta: getMeta()
});
// 创建 Goods 模型
const Goods = mongoose.model('Goods', goodsSchema);

module.exports = Goods;