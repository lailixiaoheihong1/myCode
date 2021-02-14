// 自定义模块
const {User} = require('../../model/user');
// 第三方模块
const bcrypt = require('bcrypt');   // 导入加密模块

// 处理用户登录模块
module.exports = async (req, res) => {
    let {email, password} = req.body;
    let user = await User.findOne({email});
    if (email.trim().length == 0 || password.trim().length == 0) {
        res.status(400).render('./admin/error', {msg: '用户或密码输入错误'});
        return;
    }
    if (user) {
        if (await bcrypt.compare(password, user.password)){
            req.session.username = user.username;
            // 将用户的角色存储在session对象当中
            req.session.role = user.role;
            req.app.locals.userInfo = user;
            if (user.role == 'admin')
                res.redirect('/admin/user');
            else
            res.redirect('/home');
        } else {
            res.status(400).render('./admin/error', {msg: '用户或密码输入错误'});
            return;
        }
    } else {
        res.status(400).render('./admin/error', {msg: '用户或密码输入错误'});
        return;
    }

};