// 大轮播图  
// 页面加载完之后 执行js文件
window.addEventListener('load', function () {
    // 1、鼠标经过focus两个箭头出现，离开箭头就隐藏 mouseenter和mouseleave都不会发生冒泡事件
    var arrowl = document.querySelector('.arrow_L');
    var arrowr = document.querySelector('.arrow_R');
    var focus = document.querySelector('.focus');

    focus.addEventListener('mouseenter', function () {
        arrowl.style.display = 'block';
        arrowr.style.display = 'block';
        clearInterval(timer);
        timer = null;//清除定时器变量
    })
    focus.addEventListener('mouseleave', function () {
        arrowl.style.display = 'none';
        arrowr.style.display = 'none';
        timer = setInterval(function () {
            arrowr.click();
        }, 2000);
    })
    // 2、设置图片下方小圆点 使其可以控制图片移动
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    var focusWidth = focus.offsetWidth;

    for (var i = 0; i < ul.children.length; i++) {

        var li = document.createElement('li');//创建li
        ol.appendChild(li);//把创建的li 直接插入到ol的后面
        li.setAttribute('index', i);//给每个li起自定义属性名
        // 排他思想，给li绑定点击事件，实现点击哪个小圆点哪个显示current类样式
        li.addEventListener('click', function () {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';

            var index = this.getAttribute('index');

            num = index;//保证三个控制值相等  解决出现的bug
            circle = index;

            console.log(index);
            // 点击圆点，让图片(这里移动的ul)跟随圆点移动  得到显示的图片即index*图片的宽度(focus)
            // ul.style.left = -index * focusWidth + 'px';//左移动为负
            animate(ul, -index * focusWidth);
        })

    }
    ol.children[0].className = 'current';// 让第一个小圆点保持颜色

    // 3、点击右箭头，让图片移动一张

    //解决图片突然跳到第一张问题，即在最后一张图片后复制ul第一张图片，到达最后一张图时，可以平滑显示第一个图片  （不复制一张图整体会比较死板）
    var first = ul.children[0].cloneNode(true);//true为深拷贝即拷贝子节点，flase为浅拷贝，仅仅拷贝自身信息
    ul.appendChild(first);//插入到ul的最后面

    var num = 0;
    var circle = 0; //控制小圆圈的播放
    var flag = true;//节流阀 防止用户点击过快出现图片运动过快的的现象
    arrowr.addEventListener('click', function () {
        if (flag == true) {
            flag = false;//关闭节流阀
            if (num == ul.children.length - 1) {
                ul.style.left = 0;//回到第一张
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function () {
                flag = true;//回调函数 打开节流阀
            });
            circle++;
            if (circle == ol.children.length) {
                circle = 0;
            }
            circleChange();
        }
    })

    //4、点击左侧按钮 移动图片一张
    arrowl.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == 0) {

                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth+'px';//回到第一张
                
            }
            num--;
            animate(ul, -num * focusWidth, function () {
                flag = true;//打开节流阀
            });
            circle--;
            // if (circle < 0) {
            //     circle = ol.children.length-1;
            // }
            circle = circle < 0 ? ol.children.length - 1 : circle;
            circleChange();
        }

    })
    // 5、自动播放每一张 相当于点击右箭头播放  鼠标离开打开定时器，鼠标经过打开
    var timer = setInterval(function () {
        arrowr.click();//手动调用点击事件
    }, 2000)

    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }

})