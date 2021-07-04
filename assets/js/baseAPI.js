$(function() {
    $.ajaxPrefilter(function(options) {
        options.url = 'http://api-breakingnews-web.itheima.net' + options.url;

        if (options.url.indexOf('/my/') !== -1) {
            options.headers = {
                Authorization: localStorage.getItem('token') || ''
            }
        }
        //控制用户访问权限
        //????可是返回可以啊
        //全局挂载
        options.complete = function(res) {
            // console.log(res);
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                let win = window.parent ? window.parent : window;
                localStorage.removeItem('token');
                win.location.href = '/login.html';
            }
        }

    })
})