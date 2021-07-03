function r(r, e, n) {
    return e in r ? Object.defineProperty(r, e, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : r[e] = n, r;
}

function e(r) {
    wx.login({
        success: function(e) {
            wx.getUserInfo({
                success: function(n) {
                    r(null, {
                        code: e.code,
                        encryptedData: n.encryptedData,
                        iv: n.iv,
                        userInfo: n.userInfo
                    });
                },
                fail: function(e) {
                    r(new Error("获取微信用户信息失败，请检查网络状态"), null);
                }
            });
        },
        fail: function(e) {
            r(new Error("微信登录失败，请检查网络状态"), null);
        }
    });
}

var n = require("C7D68300BC64A5DFA1B0EB0727C24571.js"), i = require("BC6BCCB5BC64A5DFDA0DA4B212F24571.js"), o = function() {}, t = {
    method: "GET",
    success: o,
    fail: o,
    loginUrl: null
};

module.exports = {
    login: function(o) {
        if (!(o = Object.assign({}, t, o)).loginUrl) return o.fail(new Error("登录错误：缺少登录地址，请通过 setLoginUrl() 方法设置登录地址"));
        e(function(e, t) {
            var s;
            if (e) return o.fail(e);
            var a = (s = {}, r(s, n.WX_HEADER_CODE, t.code), r(s, n.WX_HEADER_ENCRYPTED_DATA, t.encryptedData), 
            r(s, n.WX_HEADER_IV, t.iv), s);
            wx.request({
                url: o.loginUrl,
                header: a,
                method: o.method,
                success: function(r) {
                    var e = r.data;
                    if (!e || 0 !== e.code || !e.data || !e.data.skey) return o.fail(new Error("响应错误，" + JSON.stringify(e)));
                    var n = e.data;
                    if (!n || !n.userinfo) return o.fail(new Error("登录失败(" + e.error + ")：" + e.message));
                    i.set(n), o.success(n.userinfo);
                },
                fail: function(r) {
                    console.error("登录失败，可能是网络错误或者服务器发生异常"), o.fail(r);
                }
            });
        });
    },
    setLoginUrl: function(r) {
        t.loginUrl = r;
    },
    loginWithCode: function(e) {
        if (!(e = Object.assign({}, t, e)).loginUrl) return e.fail(new Error("登录错误：缺少登录地址，请通过 setLoginUrl() 方法设置登录地址"));
        wx.login({
            success: function(o) {
                var t = r({}, n.WX_HEADER_CODE, o.code);
                wx.request({
                    url: e.loginUrl,
                    header: t,
                    method: e.method,
                    success: function(r) {
                        var n = r.data;
                        if (!n || 0 !== n.code || !n.data || !n.data.skey) return e.fail(new Error("用户未登录过，请先使用 login() 登录"));
                        var o = n.data;
                        if (!o || !o.userinfo) return e.fail(new Error("登录失败(" + n.error + ")：" + n.message));
                        i.set(o), e.success(o.userinfo);
                    },
                    fail: function(r) {
                        console.error("登录失败，可能是网络错误或者服务器发生异常"), e.fail(r);
                    }
                });
            }
        });
    }
};