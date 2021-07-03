function e(e, t, i) {
    return !(t.likeArticleList.indexOf(i) < 0);
}

function t(e, t, i) {
    return !(t.oprtArticleList.indexOf(i) < 0);
}

var i = require("AF69DFF5BC64A5DFC90FB7F2A9B24571.js"), a = (require("BC6BCCB5BC64A5DFDA0DA4B212F24571.js"), 
require("AE450F94BC64A5DFC823679305A24571.js")), o = function(e) {
    wx.showLoading({
        title: e,
        mask: !0
    });
}, s = function(e) {
    wx.hideLoading(), wx.showToast({
        title: e,
        icon: "success",
        duration: 1e3
    });
}, r = function(e) {
    wx.hideLoading(), wx.showModal({
        title: "网络错误",
        content: e,
        confirmText: "确定",
        showCancel: !1,
        success: function(e) {
            e.confirm && console.log("网络失败弹窗下，用户点击确定");
        }
    });
}, n = function(e, t) {
    wx.hideLoading(), wx.showModal({
        title: e,
        content: t,
        confirmText: "确定",
        showCancel: !1,
        success: function(e) {
            e.confirm && console.log("接口Code失败弹窗下，用户点击确定");
        }
    });
}, c = function(e) {
    if (200 === e.statusCode) switch (e.data.code) {
      case 0:
        console.log("网络请求正常：", e);
        break;

      case -1:
        console.warn("登录失败"), n("登录失败", "请稍后重试，或者删除本小程序重新安装使用");
        break;

      case -2:
        console.warn("登录状态失效");
        break;

      case -3:
        console.warn("用户不存在");
        break;

      case -4:
        console.warn("请求参数不合法");
    } else console.warn("Http返回状态码错误，接口请求失败"), r("接口请求失败，请检查您的网络连接后重试");
}, l = function(e, t, o) {
    e.setData({
        userInfo: t.userInfo,
        logged: t.logged
    }), wx.setStorageSync("userInfo", t.userInfo), console.log("登录成功，用户信息已经写到APP、PAGE和LocalStorage中：", t.userInfo), 
    o(e, t), i.request({
        url: a.service.userInfoUrl,
        success: function(i) {
            c(i), i.data.user ? (t.userInfo.status = i.data.user.status, e.setData({
                userInfo: t.userInfo,
                logged: t.logged
            }), wx.setStorageSync("userInfo", t.userInfo), console.log("更新用户附加信息已经写到APP、PAGE和LocalStorage中：", t.userInfo)) : console.log("返回结果中数据异常，没有user");
        }
    });
}, d = function(e, t) {
    var i = e.detail.formId;
    i && "the formId is a mock one" != i ? wx.request({
        url: a.service.formidSubmitUrl,
        data: {
            formid: i,
            openid: t.openId
        },
        success: function(e) {
            console.log("FormID发送成功");
        },
        fail: function(e) {
            console.warn("FormID发送失败");
        }
    }) : console.log("FormID是模拟的，不用发送");
};

module.exports = {
    getNameStr: function(e) {
        return e ? e.slice(0, 1) + "**" + e.slice(-1) : " ";
    },
    getDataJson: function(e) {
        var t = JSON.parse(e);
        return console.log("解析dataJson: ", t), t;
    },
    showBusy: o,
    showSuccess: s,
    showInfomation: function(e) {
        wx.hideLoading(), wx.showToast({
            title: e,
            icon: "success",
            image: "/image/util_toast_info.png",
            duration: 1500
        });
    },
    showApiErrorModel: n,
    showNetErrorModel: r,
    restartApp: function() {
        wx.reLaunch({
            url: "/pages/index/index"
        });
    },
    checkResCode: c,
    userLogin: function(e, t, a) {
        e.data.logged || (o("正在登录"), i.Session.get() ? i.loginWithCode({
            success: function(i) {
                s("登录成功"), t.userInfo = i, t.logged = !0, l(e, t, a);
            },
            fail: function(e) {
                console.error(e), r("接口请求失败，请检查您的网络连接后重试");
            }
        }) : i.login({
            success: function(i) {
                s("登录成功"), t.userInfo = i, t.logged = !0, l(e, t, a);
            },
            fail: function(e) {
                console.error(e), r("接口请求失败，请检查您的网络连接后重试");
            }
        }));
    },
    updateInfoWithLogin: l,
    updateUserInfoToPage: function(e, t) {
        e.setData({
            userInfo: t.userInfo,
            logged: t.logged
        }), console.log("本地更新Userinfo到页面上：", e.data.userInfo);
    },
    submitFormId: d,
    getArticleList: function(t, i, o, s, n, l) {
        if (10 == n) d = a.service.articleForumUrl; else var d = a.service.articleListUrl;
        wx.request({
            url: d,
            data: {
                page: o,
                size: s,
                type: n,
                sort: l
            },
            success: function(s) {
                if (c(s), s.data.articles) {
                    s.data.articles.length == a.setting.pageSize ? t.setData({
                        loadMore: !0,
                        nextPage: o + 1,
                        sensitive: i.sensitive
                    }) : t.setData({
                        loadMore: !1,
                        nextPage: o + 1,
                        sensitive: i.sensitive
                    });
                    for (var r = s.data.articles, n = 0; n < r.length; n++) {
                        var l = e(0, i, r[n].id);
                        r[n].isLiked = l, r[n].likeAnim = !1;
                        var d = 0;
                        r[n].content.split("\n").forEach(function(e) {
                            e.length <= 10 ? d++ : d += Math.ceil(e.length / 10);
                        }), r[n].line = d;
                    }
                    1 == o ? t.setData({
                        articleList: r
                    }) : t.setData({
                        articleList: t.data.articleList.concat(r)
                    }), wx.stopPullDownRefresh();
                } else console.log("返回结果中数据异常，没有articles");
            },
            fail: function(e) {
                console.warn("获取列表数据失败", e), r("获取列表数据失败，请检查您的网络连接后重试");
            }
        });
    },
    checkIsLiked: e,
    checkIsOprted: t,
    articleLikeClick: function(e, i, o) {
        var s = o.currentTarget.dataset.articleId, n = o.currentTarget.dataset.articleIndex, l = o.currentTarget.dataset.articleLiked;
        console.log("点赞按钮事件articleLikeClick", s, n, l), l ? (i.likeArticleList.remove(s), 
        wx.setStorage({
            key: "likeArticleList",
            data: i.likeArticleList
        }), i.oprtArticleList.push(s), wx.setStorage({
            key: "oprtArticleList",
            data: i.oprtArticleList
        }), console.log("取消扎心成功，已经更新本地缓存"), e.data.articleList[n].likeNum--, e.data.articleList[n].isLiked = !1, 
        e.data.articleList[n].likeAnim = !1, e.setData({
            articleList: e.data.articleList
        }), wx.reportAnalytics("like_article", {
            like_type: "cancel",
            article_id: s
        })) : t(e, i, s) ? (i.oprtArticleList.remove(s), wx.setStorage({
            key: "oprtArticleList",
            data: i.oprtArticleList
        }), i.likeArticleList.push(s), wx.setStorage({
            key: "likeArticleList",
            data: i.likeArticleList
        }), console.log("扎心成功，已经更新本地缓存"), e.data.articleList[n].likeNum++, e.data.articleList[n].isLiked = !0, 
        e.data.articleList[n].likeAnim = !0, e.setData({
            articleList: e.data.articleList
        }), wx.reportAnalytics("like_article", {
            like_type: "like",
            article_id: s
        })) : wx.request({
            url: a.service.articleLikeUrl,
            data: {
                docId: s
            },
            success: function(t) {
                c(t), i.likeArticleList.push(s), wx.setStorage({
                    key: "likeArticleList",
                    data: i.likeArticleList
                }), console.log("扎心成功，已经更新本地缓存"), e.data.articleList[n].likeNum++, e.data.articleList[n].isLiked = !0, 
                e.data.articleList[n].likeAnim = !0, e.setData({
                    articleList: e.data.articleList
                }), wx.reportAnalytics("like_article", {
                    like_type: "like",
                    article_id: s
                });
            },
            fail: function() {
                console.warn("请求扎心接口失败"), r("网络请求失败，请检查您的网络连接后重试");
            }
        }), o.detail.formId && (console.log("此次点赞可以上传formid", o.detail.formId), d(o, i));
    },
    doCaptureAndShare: function(e, t, i, s) {
        e.data.shareQuanImage = "", e.data.shareUserImage = "", "qq" == t.appEnv && (i += "&appenv=qq"), 
        o("正在生成海报"), wx.request({
            url: a.service.articleCaptureUrl,
            data: {
                url: a.service.articlePageHtml + "?for=quan&docId=" + i
            },
            success: function(a) {
                wx.hideLoading(), console.log("请求圈截图接口成功", a.data), e.setData({
                    isShareDialogShow: !0,
                    clickShareArticleId: i,
                    clickShareArticleIndex: s,
                    sensitive: t.sensitive,
                    shareQuanImage: a.data.url
                }), wx.reportAnalytics("share_article", {
                    share_type: "main",
                    article_id: i
                });
            },
            fail: function() {
                console.warn("请求圈截图接口失败"), r("网络请求失败，请检查您的网络连接后重试");
            }
        }), wx.request({
            url: a.service.articleCaptureUrl,
            data: {
                url: a.service.articlePageHtml + "?for=friend&docId=" + i
            },
            success: function(t) {
                wx.hideLoading(), console.log("请求好友截图接口成功", t.data), e.setData({
                    shareUserImage: t.data.url
                }), wx.reportAnalytics("share_article", {
                    share_type: "main",
                    article_id: i
                });
            },
            fail: function() {
                console.warn("请求好友截图接口失败"), r("网络请求失败，请检查您的网络连接后重试");
            }
        });
    }
};