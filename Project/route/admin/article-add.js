// 自定义模块
const { concat } = require('joi/lib/types/lazy');
const {Acticle} = require('../../model/article');   // 导入文章集合模块
// 第三方模块
const formidable = require('formidable');
const path = require('path');

module.exports = async (req, res) => {
    // 创建表单解析对象
    const form = new formidable.IncomingForm();
    // 设置文件上传路径
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
    // 保留表单上传文件的扩展名
    form.keepExtensions = true;
    // 解析form表单提交上来的数据
    form.parse(req, async (err, fields, files) => {
        console.log("灵域杜少杨--贡穆列之匕首");
        if (err != null) {
            // 如果解析出现错误
            return;
        } else {
            console.log(fields);
            console.log(files);
            // 解析成功
            // 分割路径
            let url = files.cover.path.split('public')[1];
            // 往数据库中添加文章信息
            await Acticle.create({
                title: fields.title,
                author: fields.author,
                publishDate: fields.publishDate,
                cover: url,
                content: fields.content
            });
        }
    })
    // 重定向到文章管理界面
    res.redirect('/admin/article');
}