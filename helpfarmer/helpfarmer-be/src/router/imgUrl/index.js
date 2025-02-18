

const Router = require('@koa/router');
const mongoose = require('mongoose');
const { upload } = require('../uploadMiddleware'); // 引入 multer 中间件
const Goods = mongoose.model('Goods');

const router = new Router({
  prefix: '/upload',
});
// 获取商品列表
router.get('/list/:id', async (ctx) => {
  try {
    const goodsList = await Files.find()
      .skip((pageNo - 1) * pageSize)
      .limit(pageSize)
      .exec();
    ctx.status = 200;
    ctx.body = { message: '商品列表获取成功', data: goodsList };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: '出现错误', error: error.message };
  }
});
module.exports = router;