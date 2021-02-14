// 第三方模块
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');   // 导入加密模块
const Joi = require('joi'); // 引入joi模块用于验证

// 创建用户集合规则
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    // 超级管理员: admin  普通用户: normal
    role: {
        type: String,
        required: true
    },
    // 0为启用状态,1为禁用状态
    state: {
        type: Number,
        default: 0
    }
});

const User = mongoose.model('User', userSchema);

// // 创建一个用户支持我们的操作
// async function createUser() {
//     let salt = await bcrypt.genSalt(10);
//     let pass = await bcrypt.hash('123456', salt);
//     User.create({
//         username: 'itheima',
//         email: 'itheima@itcast.cn',
//         password: pass,
//         role: 'admin',
//         state: 0
//     }).then( () => console.log('用户创建成功')).catch( () => console.log('用户创建失败'))
// };
// 
// createUser();

// 验证用户信息是否符合规则
const validateUser = (body) => {
    let scheme = {
        username: Joi.string().min(2).max(12).required().error(new Error('用户名不符合')),
        email: Joi.string().email().required().error(new Error('邮箱格式不符合要求')),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码验证不成功')),
        role:　Joi.string().valid('admin', 'normal').required().error(new Error('角色值格式错误')),
        state: Joi.number().valid(0, 1).required().error(new Error('状态值非法'))
    }
    return Joi.validate(body, scheme);
};

module.exports = {
    User,
    validateUser
}
