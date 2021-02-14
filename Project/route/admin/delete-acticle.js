// 自定义模块
const {Acticle} = require('../../model/article');

module.exports = async (req, res) => {
    // 获取要删除的用户id
    const {id} = req.body;
    // 根据id查询数据库并删除该条数据
    await Acticle.findOneAndDelete({_id: id});
    // 重定向回到用户管理界面
    res.redirect('/admin/article');
}