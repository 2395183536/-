var app = getApp();

Page({
    data: {
        getSet: [],
        getother: [],
        PageCur: "other"
    },
    onLoad: function(t) {
        var e = this;
        e.getSet(e), e.getOthers(e), wx.setNavigationBarTitle({
            title: "其他"
        });
    },
    getSet: function(e) {
        app.util.request({
            url: "entry/wxapp/Set",
            success: function(t) {
                0 == t.data.errno ? e.setData({
                    getSet: t.data.data
                }) : wx.showToast({
                    title: "请联系工作人员进行配置",
                    icon: "loading",
                    duration: 2e3
                });
            }
        });
    },
    onShareAppMessage: function(t) {
        var e = this, a = e.data.getSet.share_title ? e.data.getSet.share_title : "艺术字签名", r = e.data.getSet.share_photo ? e.data.getSet.share_photo : "/images/chsh.jpg";
        return {
            title: a.replace("#签名姓名#", ""),
            path: "yj_yishuzi/index/index",
            imageUrl: r
        };
    },
    getOthers: function(e) {
        app.util.request({
            url: "entry/wxapp/GetOther",
            success: function(t) {
                0 == t.data.errno ? e.setData({
                    getother: t.data.data
                }) : wx.showToast({
                    title: t.data.message,
                    icon: "loading",
                    duration: 2e3
                });
            }
        });
    },
    navigate: function(t) {
        var e = t.currentTarget.dataset.url, a = t.currentTarget.dataset.phone, r = t.currentTarget.dataset.appurl, n = t.currentTarget.dataset.otype, o = t.currentTarget.dataset.appid;
        "1" == n && e && wx.navigateTo({
            url: "./load?url=" + encodeURIComponent(e)
        }), "3" == n && a && wx.makePhoneCall({
            phoneNumber: a
        }), "2" == n && o && wx.navigateToMiniProgram({
            appId: o,
            path: r,
            success: function(t) {
                console.log(t);
            }
        });
    },
    NavChange: function(t) {
        var e = t.currentTarget.dataset.cur;
        wx.navigateTo({
            url: "/yj_yishuzi/" + e + "/index"
        });
    }
});