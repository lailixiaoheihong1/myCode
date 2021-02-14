// 第三方模块
const mongoose = require('mongoose');

// 创建文章集合规则
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, '请填写文章标题'],
        minlength: 4,
        maxlength: 100
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, '请传递作者']
    },
    publishDate: {
        type: Date,
        default: Date.now
    },
    cover: {
        type: String,
        default: null
    },
    content: {
        type: String
    }
});

// 创建文章集合
const Acticle = mongoose.model('Acticle', articleSchema);

module.exports = {
    Acticle
}