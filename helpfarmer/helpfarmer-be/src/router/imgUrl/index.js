

const Router = require('@koa/router');
const mongoose = require('mongoose');
const { upload } = require('../uploadMiddleware'); // 引入 multer 中间件
const imgUrls = mongoose.model('imgUrls')
const Goods = mongoose.model('Goods');

const router = new Router({
  prefix: '/upload',
});
// 获取商品列表
router.get('/goods', async (ctx) => {
  try {
    const imgUrl = await imgUrls.find().exec();
    ctx.status = 200;
    ctx.body = { message: '商品图片获取成功', data: goodsList };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: '出现错误', error: error.message };
  }
});
module.exports = router;