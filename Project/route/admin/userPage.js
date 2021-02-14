// 第三方模块
const template = require('express-art-template')   // 引入模板模块
// 自定义模块
const {User} = require('../../model/user');        


module.exports = async (req, res) => {
    // 标识 标识当前访问的是文章管理页面
    req.app.locals.currentLink = 'user';
    let currentPage = req.query.currentPage || 1;               // 定义当前页
    let dataForPage = 2;              // 定义每页显示多少条数据
    let total = await User.countDocuments({});  // 查询全部一共多少条数据
    let page = Math.ceil(total / dataForPage);    // 要显示多少页
    let data = await User.find().limit(dataForPage).skip((currentPage-1) * dataForPage);     // 一页一页的查询用户
    res.render('./admin/user', {
        users: data, 
        page: page, 
        total: total, 
        currentPage: currentPage
    }); // 渲染用户模板
}