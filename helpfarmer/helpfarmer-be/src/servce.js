const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const { koaBody } = require('koa-body');

const connectDB = require('./db/index.js');
const registerRouter = require('./router/index.js');
const Router = require('@koa/router');
const app = new Koa();
const { tokenMiddleware, catchAuthError } = require('./helpers/token');

// Middleware

// 连接到 MongoDB 数据库
connectDB().then(() => {
  app.use(cors()); // 允许跨域请求
  app.use(koaBody());
  tokenMiddleware(app); // 添加 Token 校验中间件
  app.use(catchAuthError); // 捕获认证错误
  // 使用路由
  registerRouter(app);

  // 启动服务器
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
