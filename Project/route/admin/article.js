// 自定义模块
const {Acticle} = require('../../model/article'); // 导入文章集合的构造函数
// 第三方模块
const pagination = require('mongoose-sex-page');    // 导入分页模块

module.exports = async (req, res) => {
    // 定义当前页码
    let page = req.query.page || 1;
    // 标识 标识当前访问的是文章管理页面
    req.app.locals.currentLink = 'article';
    // 查询该用户下面的文章
    let acticleData = await pagination(Acticle).find().populate('author').page(page).size(2).display(3).exec();
    // 先将数据库查询到的文档对象转成字符串对象
    acticleData = JSON.stringify(acticleData);
    // 再将字符串转换成对象
    acticleData = JSON.parse(acticleData);
    // 渲染文章管理页面
    res.render('./admin/article', {
        articles: acticleData,
    });
};