// 自定义模块
const {Acticle} = require('../../model/article'); // 导入文章集合
// 第三方模块
const pagination = require('mongoose-sex-page'); // 导入分页模块


// 博客首页处理函数
module.exports = async (req, res) => {
    let page = req.query.page || 1;
    // 查询数据库中所有的文章
    let articles = await pagination(Acticle).find().populate('author').page(page).size(6).display(5).exec();
    console.log(articles);
    // 将得到的文档对象转换成字符串
    articles = JSON.stringify(articles);
    // 再将字符串转换成对象
    articles = JSON.parse(articles);

    res.render('./home/default', {
        data: articles,
        page: page
    });
}