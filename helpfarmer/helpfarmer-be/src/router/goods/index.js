// const Router = require('@koa/router');
// const mongoose = require('mongoose');
// const getBody = require('../../helpers/index');
// const Goods = mongoose.model('Goods');
// const router = new Router({
//   prefix: '/goods',
// });
// router.post('/add', async (ctx) => {
//   try {
//     const { name, description, city, price, production, count, flag, active } =
//       ctx.request.body;
//     const goods = new Goods({
//       name,
//       description,
//       city,
//       price,
//       production,
//       count,
//     });
//     const res = await goods.save();
//     ctx.status = 201;
//     ctx.body = {
//       data: res,
//       code: 0,
//       msg: '商品添加成功',
//     };
//   } catch (error) {
//     ctx.status = 500;
//     ctx.body = {
//       code: 1,
//       msg: '出现错误',
//       error: error.message,
//     };
//   }
// });
// router.get('/list', async (ctx) => {
//   try {
//     const {'pageNo[pageNo]':pageNo,'pageNo[pageSize]': pageSize}=ctx.query
//     const goodsList = await Goods.find().skip((pageNo-1)*pageSize).limit(pageSize).exec();
//     ctx.status = 200;
//     ctx.body = { message: '商品列表获取成功', data: goodsList };
//   } catch (error) {
//     ctx.status = 500;
//     ctx.body = { message: '出现错误', error: error.message };
//   }
// });
// // 更新商品信息
// router.put('/update', async (ctx) => {
//   try {
//     // 从请求体中解构出 id 和需要更新的字段
//     const { _id, ...updateFields } = ctx.request.body;
//     if (!_id) {
//       ctx.status = 400;
//       ctx.body = {
//         success: false,
//         code: 1,
//         message: '缺少字段',
//       };
//       return;
//     }

//     const existingGoods = await Goods.findOne({ _id: _id }).exec();
//     if (!existingGoods) {
//       ctx.status = 404;
//       ctx.body = { success: false, code: 1, message: 'Goods not found' };
//       return;
//     }

//     Object.assign(existingGoods, updateFields);
//     await existingGoods.save();

//     ctx.status = 200;
//     ctx.body = {
//       success: true,
//       code: 0,
//       message: '更新成功',
//       data: existingGoods,
//     };
//   } catch (error) {
//     console.error('更新失败:', error);
//     ctx.status = 500;
//     ctx.body = {
//       success: false,
//       code: 1,
//       message: '服务器错误',
//       error,
//     };
//   }
// });
// // 删除商品
// router.get('/delete/:id', async (ctx) => {
//   try {
//     const { id } = ctx.params;
//     if (!id) {
//       ctx.status = 400;
//       ctx.body = {
//         success: false,
//         code: 1,
//         message: '缺少字段',
//       };
//       return;
//     }

//     const result = await Goods.deleteOne({_id:id }).exec();
//     if (result.deletedCount === 0) {
//       ctx.status = 404;
//       ctx.body = {
//         success: false,
//         code: 1,
//         message: '找不到该商品',
//       };
//       return;
//     }

//     ctx.status = 200;
//     ctx.body = {
//       success: true,
//       code: 0,
//       message: '删除成功',
//     };
//   } catch (error) {
//     console.error('删除失败:', error);
//     ctx.status = 500;
//     ctx.body = {
//       success: false,
//       code: 1,
//       message: '服务器错误',
//       error: error.message,
//     };
//   }
// });
// module.exports = router;

const Router = require('@koa/router');
const mongoose = require('mongoose');
const { upload } = require('./uploadMiddleware'); // 引入 multer 中间件
const Goods = mongoose.model('Goods');

const router = new Router({
  prefix: '/goods',
});

// 添加商品（支持图片上传）
router.post('/add', upload.array('images', 5), async (ctx) => {
  try {
    const { name, description, city, price, production, count, flag, active, category, certification } =
      ctx.request.body;

    // 获取上传的图片路径
    const images = ctx.files.map((file) => `uploads/goods/${file.filename}`);

    const goods = new Goods({
      name,
      description,
      city,
      price,
      production,
      count,
      flag,
      active,
      category,
      certification,
      images, // 保存图片路径
    });

    const res = await goods.save();
    ctx.status = 201;
    ctx.body = {
      data: res,
      code: 0,
      msg: '商品添加成功',
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

// 获取商品列表
router.get('/list', async (ctx) => {
  try {
    const { 'pageNo[pageNo]': pageNo, 'pageNo[pageSize]': pageSize } = ctx.query;
    const goodsList = await Goods.find()
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

// 更新商品信息（支持图片更新）
router.put('/update', upload.array('images', 5), async (ctx) => {
  try {
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

    const existingGoods = await Goods.findOne({ _id: _id }).exec();
    if (!existingGoods) {
      ctx.status = 404;
      ctx.body = { success: false, code: 1, message: '商品未找到' };
      return;
    }

    // 如果有新图片上传，更新图片路径
    if (ctx.files && ctx.files.length > 0) {
      const newImages = ctx.files.map((file) => `uploads/goods/${file.filename}`);
      updateFields.images = newImages;
    }

    Object.assign(existingGoods, updateFields);
    await existingGoods.save();

    ctx.status = 200;
    ctx.body = {
      success: true,
      code: 0,
      message: '更新成功',
      data: existingGoods,
    };
  } catch (error) {
    console.error('更新失败:', error);
    ctx.status = 500;
    ctx.body = {
      success: false,
      code: 1,
      message: '服务器错误',
      error: error.message,
    };
  }
});

// 删除商品
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

    const result = await Goods.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      ctx.status = 404;
      ctx.body = {
        success: false,
        code: 1,
        message: '找不到该商品',
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

module.exports = router;