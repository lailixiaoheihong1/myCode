// 自定义模块
const {Acticle} = require('../../model/article');   // 导入文章集合

module.exports = async (req, res) => {
    // 得到传递过来的要修改的文章的id
    const id = req.query.id;
    // 根据该文章id查询数据库中该文章的相关信息
    const acticleData = await Acticle.findOne({_id: id});
    // 渲染模板
    res.render('admin/article-edit', {
        data: acticleData,
        modify: true
    })
};