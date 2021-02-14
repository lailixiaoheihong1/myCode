// 系统模块
const path = require('path');
// 第三方模块
const express = require('express');     // 导入express框架
const bodyParser = require('body-parser');  // 导入获取express框架post参数的模块
const session = require('express-session'); // 导入session模块
const template = require('art-template');
const dateformat = require('dateformat');   // 导入日期处理模块
// 自定义模块
const home = require('./route/home');   // 导入路由模块
const admin = require('./route/admin');
require('./model/connect.js');      // 导入数据库连接模块

// 创建服务器
const app = express();   

// 为art-template导入dateformat变量
template.defaults.imports.dateFormat = dateformat;
// 为art-template导入parse变量
template.defaults.imports.parse = JSON.parse;

// 配置获取post参数模块
app.use(bodyParser.urlencoded({extended: false}));

// 设置模板的相关信息
app.engine('art', require('express-art-template'));     // 使用的模板引擎
app.set('views', path.join(__dirname, 'views'));        // 设置模板引擎的路径
app.set('view engine', 'art');                          // 设置模板引擎的后缀名

// 引入静态资源访问目录
app.use(express.static(path.join(__dirname, 'public')));

// 配置session信息
app.use(session({secret : 'secret key', saveUninitialized: false}));

// 拦截请求,判断是否是登陆状态
app.use('/admin', require('./middleware/loginGuard'));

// 为路由匹配请求路径
app.use('/home', home);                 
app.use('/admin', admin);

// 监听端口
app.listen(80);                         
console.log('服务器创建成功');