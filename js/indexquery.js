$(function () {
    // 一、电梯导航栏

    // 当我们点击导航栏的时候就不在执行 屏幕滚动改变li样式事件
    // 使用节流阀
    var flag = true;
    // 屏幕滚动到今日推荐recom显示导航栏
    function fixTool() {
        if ($(document).scrollTop() >= $(".recom").offset().top) {
            $(".fixedtool").fadeIn();
        }
        else {
            $(".fixedtool").fadeOut();
        }
    }
    fixTool();//封装函数即在页面刷新时即可立即执行实现 即使页面已经滑动到中间时，电梯导航栏也会显示
    $(window).scroll(function () {
        fixTool();
        // 页面滚动到家用电器模块 或者手机模块 导航栏中的红色都到相应的位置上
        // 先拿到页面内容版块的序号
        if (flag) {
            $(".floor .w").each(function (i, ele) {
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    $(".fixedtool li").eq(i).addClass("current").siblings("li").removeClass("current");
                }
            })
        }
    })


    // 点击导航栏页面滚动到相应的模块 获取li的序号 拿到相应内容版块的offsettop值 实现点击li屏幕滚动到相应序号的内容版块
    $(".fixedtool li").click(function () {
        flag = false;//点击时就关闭节流阀 动画执行完毕即可打开节流阀
        // console.log($(this).index());
        var current = $(".floor .w").eq($(this).index()).offset().top;
        // 这里使用动画函数做页面滚动效果 stop停止排队 仅执行最新一次的动画效果
        $("body, html").stop().animate({
            scrollTop: current
        }, function () {
            flag = true;
        })
        // 点击li改变相应current类
        $(this).addClass("current").siblings("li").removeClass("current");
    })

    // 返回顶部
    backtop();
    function backtop() {
        if ($(document).scrollTop() >= $(".floor").offset().top) {
            $(".backtop").fadeIn();
        }
        else {
            $(".backtop").fadeOut();
        }
    }
    $(window).scroll(function () {
        backtop();
    })
    $(".backtop").click(function () {
        $("body,html").animate({
            scrollTop: 0
        })
    })
})