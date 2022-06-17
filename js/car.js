$(function () {
    // 一、全选模块
    // 1、将全选按键的状态赋值给三个小复选框
    $(".checkall").change(function () {
        // console.log($(".checkall").prop("checked"));
        $(".j_checkbox,.checkall").prop("checked", $(this).prop("checked"));
        if ($(this).prop("checked")) {
            $(".car_item").addClass("current");
        }
        else {
            $(".car_item").removeClass("current");
        }
    })

    // 2、判断点击的小复选框个数是否等于3 等于3 则全选
    $(".j_checkbox").change(function () {
        // :checked选择器 可以查找被选中元素的个数
        if ($(".j_checkbox:checked").length == $(".j_checkbox").length) {
            $(".checkall").prop("checked", true);
        }
        else {
            $(".checkall").prop("checked", false);
        }

        if ($(this).prop("checked")) {
            $(this).parents(".car_item").addClass("current");
        }
        else {
            $(this).parents(".car_item").removeClass("current");
        }
    })

    // 二、增减数量模块 减减加加
    // 1、点击加号(减号)让文本框内数字相应的加减 注意：所点击的加减号的相邻的itxt
    // 2、商品加减之后，价格小计需要作出相应的更改
    $(".decrement").click(function () {
        var num = $(this).siblings(".itxt").val();
        if (num <= 1) {
            return false;
        }
        num--;
        $(this).siblings(".itxt").val(num);//赋值也是所点击的兄弟文本框
        // 商品小计
        var p_price = $(this).parents(".p_num").siblings(".p_price").text();
        p_price = p_price.substr(1);//字符串切割 保留下标为1直到最后数组的数值
        $(this).parents(".p_num").siblings(".p_sum").text("￥" + (p_price * num).toFixed(2));
        getSum();
    })
    $(".increment").click(function () {
        var num = $(this).siblings(".itxt").val();
        num++;
        $(this).siblings(".itxt").val(num);
        // 商品小计
        var p_price = $(this).parents(".p_num").siblings(".p_price").text().substr(1);
        $(this).parents(".p_num").siblings(".p_sum").text("￥" + (p_price * num).toFixed(2));
        getSum();
    })
    // 3、从文本框单独修改数量也会影响商品小计数值 文本框中的值得到修改 change
    $(".itxt").change(function () {
        var p_price = $(this).parents(".p_num").siblings(".p_price").text().substr(1);
        $(this).parents(".p_num").siblings(".p_sum").text("￥" + (p_price * $(this).val()).toFixed(2));
        getSum();
    })

    getSum();//先执行函数 使打开网页时的总计和总额都是计算之后的

    // 三、计算总计和总额 总计是文本框里面的数值加 总额是text文本内容加 需要用那个each遍历每一个元素相加
    //因为每次点击加减 修改文本框的值都会改变总计和总额 所有封装一个函数便于调用
    function getSum() {
        var count = 0;//总件数
        var sum = 0;//总计金钱数
        $(".itxt").each(function (index, ele) {
            count += parseInt($(ele).val());
        })
        $(".amount_sum em").text(count);
        $(".p_sum").each(function (index, ele) {
            count += parseFloat($(ele).text().substr(1));
        })
        $(".price_sum em").text("￥" + count.toFixed(2));
    }

    // 四、删除模块 
    // 1、点击删除键删除相对应的商品
    $(".p_action").click(function () {
        $(this).parent(".car_item").remove();
        getSum();
    })
    // 2、删除选中的商品
    $(".remove_batch").click(function () {
        $(".j_checkbox:checked").parents(".car_item").remove();
        getSum();
    })
    // 3、删除所有商品
    $(".clear_all").click(function () {
        $(".car_item_list").empty();
        getSum();
    })

})