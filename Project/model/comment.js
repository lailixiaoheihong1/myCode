// 导入第三方模块
const date = require('joi/lib/types/date');
const mongoose = require('mongoose');  // 导入数据库操作模块
// 导入自定义模块
const {Acticle} = require('../model/article');  // 导入文章集合模块
const {User} = require('../model/user');    // 导入用户集合模块

const commentSchema = new mongoose.Schema({
    // 要评论的文章id
    aid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Acticle'
    },
    // 发表评论的用户id
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // 发表评论的日期
    date: {
        type: Date
    },
    // 评论的内容
    content: {
        type: String
    }
});

// 创建集合
const Comment = mongoose.model('Comment', commentSchema);

// 将评论集合导出
module.exports = {
    Comment
}