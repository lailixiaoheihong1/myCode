// 左右移动
function moveTo(obj, targetDistance, nowDistance, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        nowDistance = obj.offsetLeft;
        if ( nowDistance < targetDistance ) {
            var step = Math.ceil(( targetDistance - nowDistance ) / 10 )
            obj.style.left = nowDistance + step + 'px';
        } else if (nowDistance > targetDistance) {
            var step = Math.floor(( targetDistance - nowDistance ) / 10 );
            obj.style.left = nowDistance + step + 'px';
        } else {
            clearInterval(obj.timer);
            callback && callback();
        }
    }, 15)
}
// 上下移动
function moveToTop(obj, targetDistance, nowDistance, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        nowDistance = obj.pageYOffset;
        if ( nowDistance < targetDistance ) {
            var step = Math.ceil(( targetDistance - nowDistance ) / 10 )
            obj.scroll(0, nowDistance + step)
        } else if (nowDistance > targetDistance) {
            var step = Math.floor(( targetDistance - nowDistance ) / 10 );
            obj.scroll(0, nowDistance + step)
        } else {
            clearInterval(obj.timer);
            callback && callback();
        }
    }, 30)
}