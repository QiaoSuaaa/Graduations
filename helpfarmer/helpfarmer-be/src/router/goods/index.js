const Router = require('@koa/router');
const mongoose = require('mongoose');
const { upload } = require('../uploadMiddleware'); // 确保已配置multer
const Goods = mongoose.model('Goods');

const router = new Router({
  prefix: '/goods',
});

// 添加商品（增加图片处理）
router.post('/add', upload.array('images', 5), async (ctx) => {
  try {
    const { 
      name,
      description,
      city,
      price,
      production,
      count,
      flag,
      active
    } = ctx.request.body;

    // 处理上传的图片
    const images = ctx.files?.map(file => 
      `http://localhost:3000/uploads/${file.filename}`
    ) || [];

    const goods = new Goods({
      name,
      description,
      city,
      price,
      production,
      count,
      flag: flag === 'true',  // 转换布尔值
      active: active === 'true',
      images
    });

    const res = await goods.save();
    ctx.body = {
      code: 0,
      data: {
        ...res.toObject(),
        images // 返回图片地址
      },
      msg: '商品添加成功'
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      code: 1,
      msg: '添加失败: ' + error.message
    };
  }
});

// 获取列表（保持接口不变）
router.get('/list', async (ctx) => {
  try {
    const {'pageNo[pageNo]': pageNo, 'pageNo[pageSize]': pageSize} = ctx.query;
    const data = await Goods.find()
      .skip((pageNo - 1) * pageSize)
      .limit(Number(pageSize))
      .lean();
    
    ctx.body = {
      code: 0,
      data: data,
      msg: '查询成功'
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      code: 1,
      msg: '查询失败: ' + error.message
    };
  }
});

// 更新商品（增加图片处理）
router.put('/update', upload.array('images', 5), async (ctx) => {
  try {
    const { _id, ...updateFields } = ctx.request.body;

    // 处理新上传的图片
    if (ctx.files?.length) {
      updateFields.images = [
        ...(updateFields.images ? JSON.parse(updateFields.images) : []),
        ...ctx.files.map(f => `http://localhost:3000/uploads/${f.filename}`)
      ];
    }

    const goods = await Goods.findByIdAndUpdate(
      _id,
      updateFields,
      { new: true }
    ).lean();

    ctx.body = {
      code: 0,
      data: goods,
      msg: '更新成功'
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      code: 1,
      msg: '更新失败: ' + error.message
    };
  }
});

// 上传图片接口（保持原有路径）
router.post('/uploadImage', upload.single('file'), async (ctx) => {
  try {
    if (!ctx.file) {
      ctx.status = 400;
      ctx.body = { code: 1, msg: '请选择文件' };
      return;
    }

    ctx.body = {
      code: 0,
      data: {
        url: `http://localhost:3000/uploads/${ctx.file.filename}`
      },
      msg: '上传成功'
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      code: 1,
      msg: '上传失败: ' + error.message
    };
  }
});

// 删除接口保持不变
router.get('/delete/:id', async (ctx) => {
  try {
    const { id } = ctx.params;
    await Goods.findByIdAndDelete(id);
    ctx.body = { code: 0, msg: '删除成功' };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { code: 1, msg: '删除失败' };
  }
});

module.exports = router;