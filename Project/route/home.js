// 第三方模块
const express = require('express');     // 引入express框架

const home = express.Router();          // 创建博客展示页面的路由

// 博客首页路由
home.get('/', require('./home/index'));

// 博客文章页面路由
home.get('/article', require('./home/article'));

// 创建评论功能路由
home.post('/comment', require('./home/comment'));

module.exports = home;                  // 导出路由对象

