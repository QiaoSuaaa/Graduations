const Router = require('@koa/router');
const mongoose = require('mongoose');
const inviteCode = mongoose.model('inviteCode');
const { v4: uuidv4 } = require('uuid');
const router = new Router();
router.get('/invite/add', async (ctx) => {
  try {
    const code = new inviteCode({
      code: uuidv4(),
      user: '',
    });
    const res = await code.save();
    ctx.body = {
      code: 0,
      msg: '邀请码获取成功',
      data: res,
    };
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
