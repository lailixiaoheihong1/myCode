// 第三方模块
const template = require('express-art-template')   // 引入模板模块

module.exports = (req, res) => {
    res.render('./admin/login');
}