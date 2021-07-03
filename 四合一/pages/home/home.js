var t = wx.createInnerAudioContext(), e = wx.createInnerAudioContext(), i = wx.createInnerAudioContext(), n = 0, o = null;

Page({
    data: {
        "": "",
        "": "",
        "": "",
        a1: 0,
        o: 16,
        s: 1,
        v1: 0,
        "": "",
        "": "",
        "": ""
    },
    clickSSS: function() {
        this.d(), this.data.o > 16 ? this.setData({
            o: this.data.o - 1
        }) : wx.showToast({
            icon: "error",
            title: "已到最小温度啦"
        });
    },
    clickAdd: function() {
        this.d(), this.data.o < 31 ? this.setData({
            o: this.data.o + 1
        }) : wx.showToast({
            icon: "error",
            title: "已到最大温度啦"
        });
    },
    p: function(t) {
        this.d(), this.setData({
            s: t.currentTarget.dataset.t
        });
    },
    lx: function() {
        wx.previewImage({
            current: "https://z3.ax1x.com/2021/05/11/gUtu9S.jpg",
            urls: [ "https://z3.ax1x.com/2021/05/11/gUtu9S.jpg" ]
        });
    },
    a: function() {
        this.d(), this.setData({
            a1: !this.data.a1
        }), 1 == this.data.a1 ? (e.play(), n = setTimeout(function() {
            i.play();
        }, 5e3)) : (e.stop(), i.stop(), clearTimeout(n));
    },
    d: function() {
        t.play(function(t) {
            console.log(t);
        });
    },
    onLoad: function (options) {
        var interstitialAd = null;
        // 在页面onLoad回调事件中创建插屏广告实例
        if (wx.createInterstitialAd) {
          interstitialAd = wx.createInterstitialAd({
            adUnitId: 'adunit-3e9f380970890f6f'//这里改成你的插屏广告ID
          })
        }
        // 在适合的场景显示插屏广告
        if (interstitialAd) {
          interstitialAd.show().catch((err) => {
            console.error(err)
          })
        }
      },
    onReady: function() {},
    onShow: function() {
        wx.setKeepScreenOn({
            keepScreenOn: !0
        }), setTimeout(function() {
            o && o.show().catch(function(t) {
                console.error(t);
            });
        }, 15e3);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    i: function() {},
    onShareAppMessage: function() {
        return {
            title: "送给你一个空调，别客气热了就开哈~",
            imageUrl: "../../images/icons/a0.png"
        };
    },
    onShareTimeline: function() {
        return {
            title: "给朋友圈的朋友们安排了空调，别客气热了就开哈~",
            imageUrl: "../../images/icons/pyq.png"
        };
    }
});