// 动画函数*******************************************************
// 物体移动速度减缓的核心算法：
// 1、让盒子每次移动的距离都变小，速度就会慢下来
// 2、核心：(目标位置-现在的位置)/10作为每次移动的步长  10可以更改
// 3、停止条件：当盒子位于目标位置就关闭定时器

// 封装obj的对象 target目标位置 callback回调函数
function animate(obj, target, callback) {
    clearInterval(obj.timer);//安全写法
    obj.timer = setInterval(function () {
        // 让物体缓慢停止 其中步长要为整数，且要考虑盒子倒退步长为负的问题 8.1则取9 为正向上取整，为负向下取正(取绝对值的大的)
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        //动画效果
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);

            //有回调函数 则执行 且在定时器结束之后执行
            // if (callback) {
            //     callback();
            // }
            callback && callback();//逻辑与运算
        }
        else {
            obj.style.left = obj.offsetLeft + step + 'px';
        }

    }, 20)
}