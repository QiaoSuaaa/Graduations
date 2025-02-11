const Router = require('@koa/router');
const mongoose = require('mongoose');
const Character = mongoose.model('Character');
const router = new Router({
    prefix:'/character'
});
router.get('/list', async (ctx) => {
  try {
    const res=  await Character.find();
    ctx.body={
        code:0,
        msg:'查询成功',
        data:res
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      code: 1,
      msg: '出现错误',
      error: error.message,
    };
  }
});
module.exports = router;
