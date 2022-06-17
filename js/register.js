// 密码显示
var eye1 = document.getElementById('eye1');
var eye2 = document.getElementById('eye2');
var pwd1 = document.getElementById('pwd1');
var pwd2 = document.getElementById('pwd2');

var flag = 0;//标识符
function fn1() {
    if (flag == 1) {
        eye1.src = 'images/open.png';//改变图片路径
        pwd1.type = 'text';
        flag = 0;
    } else {
        eye1.src = 'images/close.png';
        pwd1.type = 'password';
        flag = 1;
    }

}
function fn2() {
    if (flag == 1) {
        eye2.src = 'images/open.png';//改变图片路径
        pwd2.type = 'text';
        flag = 0;
    } else {
        eye2.src = 'images/close.png';
        pwd2.type = 'password';
        flag = 1;
    }

}
eye1.addEventListener('click', fn1);//直接写函数名 不用加括号
eye2.onclick = fn2;

//设置手机号11位格式
var input = document.querySelectorAll('.inp');
var text = document.querySelectorAll('span');
var mess = document.querySelectorAll('mess_icon');

input[0].addEventListener('blur', function () {
    if (this.value != 11) {
        text.innerHTML = '格式输入错误！';
        text.className = 'mess error';
        mess[0].className = 'error_icon';
    }
    else {
        text.innerHTML = '格式正确';
        text.className = 'mess success';
        mess[0].className = 'success_icon';
    }
})


