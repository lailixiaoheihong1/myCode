// 第三方模块
const bcrypt = require('bcrypt'); // 引入bcrypt模块用于加密密码
// 自定义模块
const {User, validateUser} = require('../../model/user'); 

module.exports = async (req, res) => {
    let {modify, id} = req.query;
    if (modify) {
        // 获取修改界面的post请求方式的参数
        let body = req.body;
        // 验证输入的用户信息格式是否正确
        try {
            await validateUser(req.body);
        } catch (e) {   //?
            res.redirect('/admin/user-edit?message=' + e.message + `&page=modify&id=${id}`);
            return;
        }
        // 根据参数的email查询数据库中的这条数据
        let userData = await User.findOne({_id: id});
        // 输入的密码与数据库中加密的密码进行比对
        let isCorrect = await bcrypt.compare(body.password, userData.password);
        if (isCorrect) {
            // 比对成功,允许修改信息
            await User.updateOne({email: body.email}, {
                username: body.username,
                email: body.email,
                role: body.role,
                state: body.state
            });
            res.redirect('/admin/user');
            return;
        } else {
            res.redirect('/admin/user-edit?message=密码比对失败,无法进行修改'+ `&page=modify&id=${id}`);
            return;
        }
    } else {
        try {
            await validateUser(req.body);
        } catch (e) {
            res.redirect('/admin/user-edit?message=' + e.message);
            return;
        }
        // 根据邮箱查找数据库中该邮箱是否已经注册过
        let userData = await User.findOne({email: req.body.email});
        // 如果该邮箱已经注册过
        if (userData != null) {
            // 重定向回到用户编辑界面
            res.redirect('/admin/user-edit?message=该邮箱已经注册,无法再进行注册');
            return;
        } else {
            // 如果该邮箱没有被注册
            // 加密密码
            let salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
            // 添加数据到数据库
            await User.create(req.body);
            res.redirect('/admin/user');
        }
    }
    
}