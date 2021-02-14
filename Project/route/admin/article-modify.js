// 自定义模块
const {Acticle} = require('../../model/article');   // 导入文章集合


module.exports = async (req, res) => {
    // 获取传递过来的要修改的文章信息
    let {id, title, cover, content, author, publishDate} = req.body;
    // 修改数据库中相对应的文章信息
    await Acticle.updateOne({_id: id}, {
        title: title,
        cover: cover,
        content: content,
        author: author,
        publishDate: publishDate
    });
    // 重定向回到文章管理界面
    res.redirect('/admin/article');
}