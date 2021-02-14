const guard = (req, res, next) => {
    if (req.url != '/login' && !req.session.username){
        res.redirect('/admin/login');
    } else if (req.url == '/logout') {
        next();
    }
    else {
        if (req.session.role == 'normal') {
            // 用户是一个登录状态,并且是普通用户
            res.redirect('/home/');
        } else{
            next();
        }
    }    
}

module.exports = guard;