const {User} = require('../../model/user');

module.exports = async (req, res) => {
    const {message, page, id} = req.query;
    if (page) {
        // 根据id获取数据库中要修改的用户信息
        let data = await User.findOne({_id: id});
        // 渲染修改用户信息界面
        res.render('./admin/user-edit', {
            btn: '修改',
            userData: data,
            msg: message
        });
    } else {
        // 渲染新增用户界面
        res.render('./admin/user-edit', {
            msg : message,
            btn: '提交'
        });
    }
        
}