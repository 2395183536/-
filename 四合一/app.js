var e = require("AF69DFF5BC64A5DFC90FB7F2A9B24571.js"), n = require("71CC79E6BC64A5DF17AA11E1F0B24571.js"), i = require("AE450F94BC64A5DFC823679305A24571.js");

Array.prototype.remove = function(e) {
    var n = this.indexOf(e);
    n > -1 && this.splice(n, 1);
}
App(
{
    code: i.setting.version,
    sensitive: 1,
    openId: "",
    userInfo: {},
    logged: !1,
    likeArticleList: [],
    oprtArticleList: [],
    footerTipsList: [ "子日：好好喝汤，天天有毒", "子日：天下没有免费的毒鸡汤", "子日：三人行，必有一毒", "子在川上日：逝者如斯夫，这汤有毒", "桃花潭水深千尺，不及天天送我毒", "少壮不努力，老大喝毒汤", "人生在世不称意，不如多喝毒鸡汤", "读书破万卷，下笔如有毒", "雌雄双兔傍地走，安能辨我是有毒", "病中垂死惊坐起，笑问毒从何处来", "长亭外，古道边，一锅毒汤上青天", "前路阻且长，带点毒鸡汤", "欲穷千里目，同消一碗毒", "人生得意须尽欢，莫使毒汤空对月", "洛阳亲友如相问，一碗毒汤在玉壶", "喝君一碗毒，胜阅万卷书", "提示：点击日期可以查看毒汤日历", "提示：点击分享可以生成精美海报", "提示：点击投稿与大家一起分享毒鸡汤" ],
    shareTextList: [ "子曰：好好喝汤，天天有毒", "子曰：天下没有免费的毒鸡汤", "子曰：三人行，必有一毒", "子在川上曰：逝者如斯夫，这汤有毒", "桃花潭水深千尺，不及天天送我毒", "少壮不努力，老大喝毒汤", "人生在世不称意，不如多喝毒鸡汤", "读书破万卷，下笔如有毒", "雌雄双兔傍地走，安能辨我是有毒", "病中垂死惊坐起，笑问毒从何处来", "长亭外，古道边，一锅毒汤上青天", "前路阻且长，带点毒鸡汤", "欲穷千里目，同消一碗毒", "人生得意须尽欢，莫使毒汤空对月", "洛阳亲友如相问，一碗毒汤在玉壶", "喝君一碗毒，胜阅万卷书" ],
    signatureList: [ "子曰：好好喝汤，天天有毒", "子曰：天下没有免费的毒鸡汤", "子曰：三人行，必有一毒", "子在川上曰：逝者如斯夫，这汤有毒", "桃花潭水深千尺，不及天天送我毒", "少壮不努力，老大喝毒汤", "人生在世不称意，不如多喝毒鸡汤", "读书破万卷，下笔如有毒", "雌雄双兔傍地走，安能辨我是有毒", "病中垂死惊坐起，笑问毒从何处来", "长亭外，古道边，一锅毒汤上青天", "前路阻且长，带点毒鸡汤", "欲穷千里目，同消一碗毒", "人生得意须尽欢，莫使毒汤空对月", "洛阳亲友如相问，一碗毒汤在玉壶", "喝君一碗毒，胜阅万卷书" ],
    getSettingOnline: function(e, t) {
        wx.request({
            url: i.service.sensitiveStateUrl,
            data: {
                code: t
            },
            success: function(i) {
                if (n.checkResCode(i), i.data.config) {
                    "inReview" in i.data.config && (e.sensitive = i.data.config.inReview);
                    var t = n.getDataJson(i.data.config.configJson);
                    t && ("footerTips" in t && (e.footerTipsList = t.footerTips), "shareText" in t && (e.shareTextList = t.shareText), 
                    "signature" in t && (e.signatureList = t.signature));
                } else console.error("没有请求到服务端配置，请注意验证!!!");
            },
            fail: function() {
                console.warn("请求审核状态接口失败"), e.sensitive = 1;
            }
        });
    },
    getMiniAppEnv: function(e) {
        wx.getSystemInfo({
            success: function(n) {
                "AppPlatform" in n && "qq" == n.AppPlatform ? e.appEnv = "qq" : e.appEnv = "wx";
            }
        });
    },
    onLaunch: function(n) {
        var t = this;
        t.getMiniAppEnv(t), console.log(t.appEnv), e.setLoginUrl(i.service.loginUrl + "?appenv=" + t.appEnv), 
        t.getSettingOnline(t, t.code);
        var o = wx.getStorageSync("likeArticleList");
        t.likeArticleList = o || [];
        var s = wx.getStorageSync("oprtArticleList");
        t.oprtArticleList = s || [], t.openId = wx.getStorageSync("openId"), t.openId || (console.log("本地没有OpenID，开始注册"), 
        wx.login({
            success: function(e) {
                e.code ? wx.request({
                    url: i.service.userRegisterUrl,
                    data: {
                        code: e.code,
                        appenv: t.appEnv
                    },
                    success: function(e) {
                        e.data.openid ? (t.openId = e.data.openid, wx.setStorageSync("openId", t.openId), 
                        console.log("OpenID注册成功，已写入本地存储，OpenID：", t.openId)) : console.warn("OpenID注册失败，返回值中没有openid");
                    },
                    fail: function(e) {
                        console.warn("OpenID注册请求失败！", e);
                    }
                }) : console.warn("OpenID注册失败！" + e.errMsg);
            },
            fail: function(e) {
                console.warn("Wx.login接口调用失败：" + e.errMsg);
            }
        })), wx.reportAnalytics("app_launch", {
            versioncode: t.code
        });
        wx.cloud ? wx.cloud.init({
            traceUser: !0
        }) : console.error("请使用 2.2.3 或以上的基础库以使用云能力"), this.globalData = {};
        
    },
    util: require("./utils/util.js"),
    siteInfo: require("siteinfo.js"),
    globalData: {}
}






);