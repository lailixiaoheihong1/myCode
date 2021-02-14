// 自定义模块
const {Acticle} = require('../../model/article');   // 导入文章集合模块
const {Comment} = require('../../model/comment');   // 导入评论集合模块

// 文章详情请求处理函数
module.exports = async (req, res) => {
    // 获取传递过来的要显示文章的id
    const id = req.query.id;
    // 根据文章id查询文章消息
    let data = await Acticle.findOne({_id: id}).populate('author');
    // 将获取的文档对象转换成字符串
    data = JSON.stringify(data);
    // 将字符串转换成对象
    data = JSON.parse(data);
    // 根据文章id查询评论消息
    let commentData = await Comment.find({aid: id}).populate('uid');
    // 将获取的文档对象转换成字符串
    commentData = JSON.stringify(commentData);
    // 将字符串转换成对象
    commentData = JSON.parse(commentData);
    res.render('./home/article', {data, commentData})
}
