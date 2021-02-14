// 第三方模块
const express = require('express');     // 引入express框架

const admin = express.Router();          // 创建博客展示页面的路由

// 登录界面
admin.get('/login', require('./admin/loginPage.js'));

// 用户管理界面
admin.get('/user', require('./admin/userPage.js'));

// 实现退出登录功能
admin.get('/logout', require('./admin/loginout.js'));

// 实现渲染新增用户界面功能
admin.get('/user-edit', require('./admin/userEditPage.js'));

// 处理新增用户功能
admin.post('/user-edit', require('./admin/user-edit-fn'));

// 判断用户是否登录成功界面
admin.post('/login', require('./admin/login.js'));

// 处理删除用户路由操作
admin.post('/delete', require('./admin/delete.js'));

// 文章列表页面路由
admin.get('/article', require('./admin/article'));

// 文章编辑页面路由
admin.get('/article-edit', require('./admin/article-edit'));

// 添加文章到数据库页面路由
admin.post('/article-add', require('./admin/article-add'));

// 渲染修改文章信息页面路由
admin.get('/article-modify', require('./admin/article-modify-page'));

// 处理修改文章信息的路由
admin.post('/article-modify', require('./admin/article-modify'))

// 删除文章路由
admin.post('/delete-acticle', require('./admin/delete-acticle'))

module.exports = admin;                  // 导出路由对象

