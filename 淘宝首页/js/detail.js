window.addEventListener('load', function() {

    // 右侧的导航栏
    var bar = document.querySelector("#bar");
    var toTop = document.querySelector('.top');
    var topMax = bar.offsetTop;
    document.addEventListener('scroll', function() {
        if (window.pageYOffset >= topMax) {
            var y = bar.clientTop;
            bar.style.position = 'fixed';
            bar.style.top = y + 28 +'px';
            toTop.style.display = 'block';
        } else {
            bar.style.position = 'absolute';
            bar.style.top = '600px';
            toTop.style.display = 'none';
        }
    })

    // 返回顶部按钮
     toTop.addEventListener('click', function() {
        moveToTop(window, 0, window.pageYOffset);
     })
    
    // 小圆圈点击------轮播图
    // 只显示一张轮播图的方框
    var imgUpLeft = document.querySelector('.imgUpLeft');
    // 放置轮播图的ul
    var ul = imgUpLeft.querySelector('ul');
    // 放置小圆圈的div
    var circle = document.querySelector('.circle');

    moveTo(ul, -imgUpLeft.offsetWidth, ul.offsetLeft);

    var picNumber = 1;

    for(var i = 1; i <= ul.children.length - 2; i++) {
        // 创建小圆点
        var span = document.createElement('span');
        // 为小圆点添加自定义属性
        span.setAttribute('index', i);
        // 设置第一个小圆点为选中状态
        i == 1 ? span.className = 'active' : span.className = '';
        // 为放置小圆点的div添加小圆点
        circle.appendChild(span);
        // 为每个小圆点添加点击事件
        span.addEventListener('click', function() {
            picNumber = this.getAttribute('index');
            for (var j = 0; j < circle.children.length ; j++) {
                circle.children[j].className = '';
            }
            this.className = 'active';
            var moveWidth = this.getAttribute('index') * imgUpLeft.offsetWidth;
            moveTo(ul, -moveWidth, ul.offsetLeft);
        })
        
    }



    var flag = true;        //节流阀

    // //按钮点击------轮播图
    var leftButton = imgUpLeft.querySelector('button.left');
    var rightButton = imgUpLeft.querySelector('button.right');
    
      

    leftButton.addEventListener('click', function() {
        if (flag) {
            if (picNumber == 0) {
                ul.style.left = -imgUpLeft.offsetWidth * 5 + 'px'; 
                picNumber = 5;
            }
            picNumber--;
            flag = false;
            var activeSpan = circle.querySelector('span.active');
            var activeIndex = activeSpan.getAttribute('index');
            for (var i = 0; i < circle.children.length; i++) {
                circle.children[i].className = '';
            }
            activeIndex = activeIndex > 1 ? activeIndex - 1 : circle.children.length; 
            circle.children[activeIndex - 1].className = 'active';
            moveTo(ul, -imgUpLeft.offsetWidth * picNumber, ul.offsetLeft, function() {
                flag = true;
            });
        }
    });

    rightButton.addEventListener('click', function() {
        if (flag) {
            if (picNumber == 6) {
                ul.style.left = -imgUpLeft.offsetWidth * 1 + 'px';
                picNumber = 1;
            }
            picNumber++;
            flag = false;
            var activeSpan = circle.querySelector('span.active');
            var activeIndex = activeSpan.getAttribute('index');

            for (var i = 0; i < circle.children.length; i++) {
                circle.children[i].className = '';
            }
            activeIndex = activeIndex < circle.children.length ? activeIndex - 0 + 1 : 1;
            circle.children[activeIndex - 1].className = 'active';
            
            moveTo(ul, -imgUpLeft.offsetWidth * picNumber, ul.offsetLeft, function() {
                flag = true;
            }); 
        }
    })

    // 自动播放图片
    var timerMove = setInterval(function() {
        rightButton.click();
    }, 2000);

    imgUpLeft.addEventListener('mouseenter', function() {
        clearInterval(timerMove);
    })

    imgUpLeft.addEventListener('mouseleave', function() {
        timerMove = setInterval(function() {
            rightButton.click();
        }, 2000);
    })
 
})

$(function() {
    $(window).scroll(function() {
        var good = $("#good").offset().top;
        var layer = $("#layer").offset().top;
        if ( $(this).scrollTop() >= good ) {
            $(".living").addClass("active").siblings("a").removeClass("active");
        }
        if ( $(this).scrollTop >= layer ) {
            $(".real").addClass("active").siblings("a").removeClass("active");
        }
    })
    //直播好货点击
    $(".living").click(function() {
        var distance = $("#good").offset().top;
        $("html").stop().animate({
            scrollTop : distance
        });
        $(this).addClass("active").siblings("a").removeClass("active");

    });
    //实惠热卖点击
    $(".real").click(function() {
        var distance = $("#layer").offset().top;
        $("html").stop().animate({
            scrollTop : distance
        });
        $(this).addClass("active").siblings("a").removeClass("active");

    });
    
})
