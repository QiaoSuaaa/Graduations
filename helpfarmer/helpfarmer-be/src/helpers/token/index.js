const jwt = require('jsonwebtoken');
const koaJWT = require('koa-jwt');

// 配置项（根据项目需求调整）
const config = require('../../projectConfig');

// 获取 Token

const getToken = (ctx) => {
  const { Authorization } = ctx.headers; // 获取请求头中的 Authorization 字段
  if (!Authorization) {
    throw new Error('没有token');
  }
  const token = Authorization.replace('Bearer ', '');

  return token;
};

// 验证 Token
const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.JWT_SECRET, (err, payload) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(payload); // 返回解码后的 payload
    });
  });
};

// 中间件：校验 Token
const tokenMiddleware = (app) => {
  // 先校验 token
  app.use(
    koaJWT({
      secret: config.JWT_SECRET, // 使用 JWT 密钥校验 Token
    }).unless({
      path: [
        /^\/auth\/login/, // 登录接口无需校验 Token
        /^\/auth\/register/, // 注册接口无需校验 Token
        /^\/invite\/add/, // 注册接口无需校验 Token
        /^\/character\/list/, // 身份接口无需校验 Token
      ],
    })
  );
};

// 捕获认证错误的中间件
const catchAuthError = async (ctx, next) => {
  return next().catch((error) => {
    if (error.status === 401) {
      const token = getToken(ctx); // 获取 Token
      console.log('Token Failed Validation:', token); // 打印无效的 Token
      ctx.status = 401;
      ctx.body = {
        code: 401,
        msg: 'Token 认证失败，请重新登录',
        data: {},
      };
    } else {
      throw error;
    }
  });
};
const generateToken = (payload) => {
  // 使用 config.JWT_EXPIRES_IN 来设置过期时间
  const token = jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES_IN || '1h', // 默认 1 小时
  });
  return token;
};

module.exports = {
  getToken,
  verifyToken,
  tokenMiddleware,
  catchAuthError,
  generateToken,
};
