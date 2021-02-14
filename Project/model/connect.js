// 第三方模块
const mongoose = require('mongoose');  
const config = require('config');       // 导入配置模块

console.log(config.get('db.user'));
// 连接数据库
mongoose.connect(`mongodb://${config.get('db.user')}:${config.get('db.pwd')}@${config.get('db.host')}/${config.get('db.name')}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then( () => console.log('数据库连接成功'))
    .catch( () => console.log('数据库连接失败'));