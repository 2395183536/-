var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, t = require("C7D68300BC64A5DFA1B0EB0727C24571.js"), o = require("BB885842BC64A5DFDDEE3045D4034571.js"), n = require("BC6BCCB5BC64A5DFDA0DA4B212F24571.js"), r = require("C5B798A4BC64A5DFA3D1F0A3A8D24571.js"), u = function() {}, i = function(e) {
    var o = {};
    return e && (o[t.WX_HEADER_SKEY] = e), o;
}, l = function() {
    function e(e, t) {
        Error.call(this, t), this.type = e, this.message = t;
    }
    return e.prototype = new Error(), e.prototype.constructor = e, e;
}();

module.exports = {
    RequestError: l,
    request: function(c) {
        function s() {
            r.loginWithCode({
                success: f,
                fail: h
            });
        }
        function f() {
            var e = {}, t = n.get();
            if (!t) return s();
            e = i(t.skey), wx.request(o.extend({}, c, {
                header: o.extend({}, v, e),
                success: function(e) {
                    var t, o, r = e.data;
                    if (r && -1 === r.code) return n.clear(), q ? (o = "登录态已过期", t = new l(r.error, o), 
                    void h(t)) : (q = !0, void s());
                    b.apply(null, arguments);
                },
                fail: h,
                complete: u
            }));
        }
        if ("object" !== (void 0 === c ? "undefined" : e(c))) {
            var a = "请求传参应为 object 类型，但实际传了 " + (void 0 === c ? "undefined" : e(c)) + " 类型";
            throw new l(t.ERR_INVALID_PARAMS, a);
        }
        var p = c.login, y = c.success || u, d = c.fail || u, m = c.complete || u, v = c.header || {}, b = function() {
            y.apply(null, arguments), m.apply(null, arguments);
        }, h = function(e) {
            d.call(null, e), m.call(null, e);
        }, q = !1;
        p ? s() : f();
    }
};