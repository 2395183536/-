var app = getApp(), videoAd = null;

Page({
    data: {
        getSet: [],
        unitid: [],
        yj_chushi: "",
        username: "",
        tip: !1,
        index: 0
    },
    onLoad: function(t) {
        var e = this;
        e.getSets(e);
        var a = wx.getStorageSync("cishutip");
        this.setData({
            tip: a
        }), e.searchBox(t.val, t.font);
        var i = wx.getStorageSync("setdatas");
        wx.createRewardedVideoAd && i.yj_jlssp && ((videoAd = wx.createRewardedVideoAd({
            adUnitId: i.yj_jlssp
        })).onLoad(function() {}), videoAd.onError(function(t) {}), videoAd.onClose(function(t) {
            t && t.isEnded ? e.hold() : app.util.message("观看完才可以下载哦~", "", "error");
        }));
    },
    getSets: function(e) {
        app.util.request({
            url: "entry/wxapp/Set",
            success: function(t) {
                0 == t.data.errno ? (wx.setStorageSync("setdatas", t.data.data), e.setData({
                    getSet: t.data.data,
                    yj_chushi: t.data.data.yj_chushi,
                    unitid: t.data.data.yj_banner,
                    spgg: t.data.data.yj_spgg
                }), wx.setNavigationBarTitle({
                    title: t.data.data.yj_title
                })) : wx.showToast({
                    title: "请联系工作人员进行配置",
                    icon: "loading",
                    duration: 2e3
                });
            }
        });
    },
    onShareAppMessage: function(t) {
        var e = this, a = e.data.getSet.share_title ? e.data.getSet.share_title : "艺术字签名", i = e.data.getSet.share_photo ? e.data.getSet.share_photo : "/static/chsh.jpg", o = e.data.username ? e.data.username : "";
        return {
            title: a.replace("#签名姓名#", o),
            path: "yj_yishuzi/index/index",
            imageUrl: i
        };
    },
    searchBox: function(e, t) {
        var a = this;
        e && t ? app.util.request({
            url: "entry/wxapp/generate",
            data: {
                val: e,
                font: t
            },
            success: function(t) {
                0 == t.data.errno ? a.setData({
                    yj_chushi: t.data.data,
                    username: e
                }) : wx.showToast({
                    title: t.data.message,
                    icon: "loading",
                    duration: 2e3
                });
            }
        }) : (wx.showToast({
            title: "请输入内容",
            icon: "loading",
            duration: 2e3
        }), a.goindex());
    },
    hold: function(t) {
        var a = this, e = a.data.yj_chushi;
        wx.downloadFile({
            url: e,
            success: function(e) {
                wx.getSetting({
                    success: function(t) {
                        t.authSetting["scope.writePhotosAlbum"] ? a.saveTempImgFile(e.tempFilePath) : wx.showModal({
                            title: "小提示",
                            content: "将图片保存到手机相册，需允许开启'保存到相册'权限",
                            confirmText: "去开启",
                            cancelText: "暂时不",
                            success: function(t) {
                                t.confirm && wx.authorize({
                                    scope: "scope.writePhotosAlbum",
                                    success: function() {
                                        wx.showToast({
                                            title: "授权成功",
                                            icon: "success",
                                            duration: 2e3,
                                            mask: !0
                                        }), a.saveTempImgFile(e.tempFilePath);
                                    },
                                    fail: function(t) {
                                        wx.openSetting({
                                            fail: function(t) {
                                                wx.showToast({
                                                    title: "出现异常啦，再试一次吧",
                                                    icon: "none",
                                                    duration: 2e3,
                                                    mask: !0
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    },
                    fail: function(t) {
                        wx.showToast({
                            title: "出现异常，再试一次吧",
                            icon: "none",
                            duration: 1e3,
                            mask: !0
                        });
                    }
                });
            }
        });
    },
    saveTempImgFile: function(t) {
        var a = this;
        wx.showToast({
            title: "保存中…",
            icon: "loading",
            duration: 1e3,
            mask: !0
        }), wx.saveImageToPhotosAlbum({
            filePath: t,
            success: function(t) {
                var e = wx.getStorageSync("cishu");
                (e += 1) >= a.data.getSet.yj_cishu && 0 < a.data.getSet.yj_cishu && wx.setStorageSync("cishutip", !0), 
                wx.setStorageSync("cishu", e), wx.hideToast(), wx.showToast({
                    title: "已保存系统相册",
                    icon: "success",
                    duration: 1e3,
                    mask: !0
                });
            }
        });
    },
    spclick: function() {
        this.setData({
            modalName: null
        }), videoAd ? videoAd.show().catch(function() {
            videoAd.load().then(function() {
                return videoAd.show();
            }).catch(function(t) {
                console.log("激励视频 广告显示失败");
            });
        }) : this.hold();
    },
    showModal: function(t) {
        this.setData({
            modalName: t.currentTarget.dataset.target
        });
    },
    goindex: function() {
        var t = getCurrentPages();
        t[t.length - 2];
        wx.navigateBack({
            delta: 1
        });
    }
});