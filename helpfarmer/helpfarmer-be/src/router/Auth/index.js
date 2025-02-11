const Router = require('@koa/router');
const mongoose = require('mongoose');
const { getBody } = require('../../helpers');
const Users = mongoose.model('Users');
const invitecode = mongoose.model('inviteCode');
const jwt = require('jsonwebtoken');
const config = require('../../projectConfig');

const router = new Router({
  prefix: '/auth',
});
//获取
router.get('/list', async (ctx) => {
  try {
    const { 'pageNo[pageNo]': pageNo, 'pageNo[pageSize]': pageSize } =
      ctx.query;
    const usersList = await Users.find()
      .skip((pageNo - 1) * pageSize)
      .limit(pageSize)
      .exec();
    ctx.status = 200;
    ctx.body = { message: '用户列表获取成功', data: usersList };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: '出现错误', error: error.message };
  }
});
//用户添加
router.post('/add', async (ctx) => {
  try {
    const {
      name,
      character,
      sex,
      city,
      password,
      account,
      email,
      age,
      active,
    } = ctx.request.body;
    const user = new Users({
      name,
      character,
      sex,
      password,
      city,
      account,
      email,
      age,
    });
    if (account == '' || password == '') {
      ctx.body = {
        code: 1,
        msg: '用户名或者密码不能为空',
        data: null,
      };
      return;
    }
    const one = await Users.findOne({ account }).exec();
    if (!one) {
      const res = await user.save();
      ctx.status = 201;
      if (password == config.DEFAULT_PASSWORD) {
        ctx.body = {
          data: res,
          code: 0,
          msg: '用户添加成功,密码为:123456,此密码为管理员设立后台创建用户，请尽快修改密码！',
        };
      } else {
        ctx.body = {
          data: res,
          code: 0,
          msg: '用户添加成功',
        };
      }
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
//用户注册
router.post('/register', async (ctx) => {
  try {
    const { account, password,name, code } = ctx.request.body;

    if (!account || !password) {
      ctx.body = {
        code: 1,
        msg: '账号和密码不能为空',
        data: null,
      };
      return;
    }

    const one = await Users.findOne({ account }).exec();
    if (one) {
      ctx.body = {
        code: 1,
        msg: '账号已存在',
        data: null,
      };
      return;
    }

    const user = new Users({
      account,
      password,
      name,
      character: config.DEFAULT_CHRARCTER,
    });

    if (!code) {
      // 无邀请码处理逻辑
      user.character = '普通用户';
      const res = await user.save();
      ctx.status = 201;
      ctx.body = {
        data: res,
        code: 0,
        msg:
          password === config.DEFAULT_PASSWORD
            ? '用户添加成功，请尽快修改默认密码！'
            : '用户添加成功',
      };
    } else {
      // 有邀请码的处理逻辑
      const findCode = await invitecode.findOne({ code }).exec();
      if (!findCode || findCode.user) {
        ctx.body = {
          code: 1,
          msg: '邀请码无效或已被使用',
          data: null,
        };
        return;
      }
      user.character = '管理员';
      const res = await user.save();
      findCode.user = res._id;
      findCode.meta.updateAt = new Date().getTime();
      await findCode.save();
      ctx.status = 201;
      ctx.body = {
        data: res,
        code: 0,
        msg:
          password === config.DEFAULT_PASSWORD
            ? '用户添加成功，请尽快修改默认密码！'
            : '用户添加成功',
      };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      code: 1,
      msg: '服务器内部错误',
      error: error.message,
    };
  }
});
//用户登录
router.post('/login', async (ctx) => {
  const { account, password } = ctx.request.body;

  // 检查用户名和密码是否为空
  if (!account || !password) {
    ctx.body = {
      code: 1,
      msg: '用户名或密码不能为空',
      data: null,
    };
    return;
  }

  try {
    // 查找用户
    const finduser = await Users.findOne({ account }).exec();
    if (!finduser) {
      ctx.body = {
        code: 1,
        msg: '用户不存在',
        data: null,
      };
      return;
    }
    // 校验密码
    const user = {
      _id: finduser._id,
      account: finduser.account,
      name: finduser.name,

      character: finduser.character,
    };
    if (finduser.password === password) {
      // 登录成功
      ctx.body = {
        code: 0,
        msg: '登录成功',
        data: {
          user,
          token: jwt.sign(user, config.JWT_SECRET),
        },
      };

      return;
    }
    ctx.body = {
      code: 2,
      msg: '密码错误',
      data: null,
    };
  } catch (error) {
    // 处理服务器错误
    ctx.status = 500;
    ctx.body = {
      code: 1,
      msg: '服务器内部错误',
      error: error.message, // 输出错误消息
    };
  }
});

router.put('/update', async (ctx) => {
  try {
    // 从请求体中解构出 id 和需要更新的字段
    const { _id, ...updateFields } = ctx.request.body;
    if (!_id) {
      ctx.status = 400;
      ctx.body = {
        success: false,
        code: 1,
        message: '缺少字段',
      };
      return;
    }

    const findone = await Users.findOne({ _id: _id }).exec();
    if (!findone) {
      ctx.status = 404;
      ctx.body = { success: false, code: 1, message: ' 未找到用户' };
      return;
    }

    Object.assign(findone, updateFields);
    await findone.save();

    ctx.status = 200;
    ctx.body = {
      success: true,
      code: 0,
      message: '更新成功',
      data: findone,
    };
  } catch (error) {
    console.error('更新失败:', error);
    ctx.status = 500;
    ctx.body = {
      success: false,
      code: 1,
      message: '服务器错误',
      error,
    };
  }
});
router.get('/delete/:id', async (ctx) => {
  try {
    const { id } = ctx.params;
    if (!id) {
      ctx.status = 400;
      ctx.body = {
        success: false,
        code: 1,
        message: '缺少字段',
      };
      return;
    }

    const result = await Users.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      ctx.status = 404;
      ctx.body = {
        success: false,
        code: 1,
        message: '找不到该用户',
      };
      return;
    }

    ctx.status = 200;
    ctx.body = {
      success: true,
      code: 0,
      message: '删除成功',
    };
  } catch (error) {
    console.error('删除失败:', error);
    ctx.status = 500;
    ctx.body = {
      success: false,
      code: 1,
      message: '服务器错误',
      error: error.message,
    };
  }
});
router.get('/search/:id', async (ctx) => {
  try {
    const { id } = ctx.params;
    if (!id) {
      ctx.status = 400;
      ctx.body = {
        success: false,
        code: 1,
        message: '缺少字段',
      };
      return;
    }

    const result = await Users.findOne({ _id: id }).exec();
    if (!result) {
      ctx.status = 404;
      ctx.body = {
        success: false,
        code: 1,
        message: '找不到该用户',
      };
      return;
    }

    ctx.status = 200;
    ctx.body = {
      success: true,
      code: 0,
      message: '查找成功',
      data: {
        account: result.account,
        _id: result._id,
        name: result.name,
        character: result.character,
      },
    };
  } catch (error) {
    console.error('查询失败:', error);
    ctx.status = 500;
    ctx.body = {
      success: false,
      code: 1,
      message: '服务器错误',
      error: error.message,
    };
  }
});
module.exports = router;
