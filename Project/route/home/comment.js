// 导入自定义模块
const {Comment} = require('../../model/comment');   // 导入评论集合模块

// 处理提交的评论信息函数
module.exports = async (req, res) => {
    // 得到提交过来的评论参数
    const { content, uid, aid} = req.body;
    // 添加评论信息到数据库中
    await Comment.create({
        content: content,
        uid: uid,
        aid: aid,
        date: new Date()
    });
    // 重定向回到文章详情页面
    res.redirect(`/home/article?id=${aid}`);
}