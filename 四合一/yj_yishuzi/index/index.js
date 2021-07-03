var app = getApp();
var videoAd = null;

Page({
    data: {
        getSet: [],
        unitid: [],
        index: 0,
        PageCur: "home",
        pickers: [ {
            name: "一笔艺术签",
            val: "901"
        }, {
            name: "一笔商务签",
            val: "905"
        }, {
            name: "行书签名",
            val: "17"
        }, {
            name: "黑体签名",
            val: "330"
        }, {
            name: "楷体签名",
            val: "329"
        }, {
            name: "明星手写签名",
            val: "5"
        }, {
            name: "草书签名",
            val: "7"
        }, {
            name: "钢笔签名",
            val: "378"
        }, {
            name: "真人签名",
            val: "343"
        }, {
            name: "手写字签名",
            val: "16"
        }, {
            name: "连笔草书签名",
            val: "21"
        }, {
            name: "猫猫签名",
            val: "312"
        }, {
            name: "情书常规签名",
            val: "342"
        }, {
            name: "娃娃签名",
            val: "355"
        }, {
            name: "萝莉签名",
            val: "317"
        }, {
            name: "太极签名",
            val: "306"
        }, {
            name: "火柴签名",
            val: "305"
        }, {
            name: "嘟嘟签名",
            val: "308"
        } ]
    },
    onLoad: function(t) {
        
    },
    onShow: function() {
        
    },
    PickerChange: function(t) {
        console.log(t), this.setData({
            index: t.detail.value
        });
    },
    getSet: function(a) {
        app.util.request({
            url: "entry/wxapp/Set",
            success: function(t) {
                0 == t.data.errno ? (wx.setStorageSync("setdatas", t.data.data), a.setData({
                    getSet: t.data.data,
                    gzgg: t.data.data.yj_gzgg
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
        var a = this, e = a.data.getSet.share_title ? a.data.getSet.share_title : "艺术字签名", i = a.data.getSet.share_photo ? a.data.getSet.share_photo : "/images/static.jpg";
        return {
            title: e.replace("#签名姓名#", "她(他)"),
            path: "yj_yishuzi/index/index",
            imageUrl: i
        };
    },
    gocreate: function(t) {
        if (t.detail.value.val) {
            var a = t.detail.value.val, e = this.data.pickers[this.data.index].val;
            wx.navigateTo({
                url: "/yj_yishuzi/index/create?val=" + a + "&font=" + e
            });
        } else wx.showToast({
            title: "请输入内容",
            icon: "loading",
            duration: 2e3
        });
    },
    cishu: function() {
        var t = wx.getStorageSync("cishu_expiration"), a = Date.parse(new Date());
        if (t < a) {
            t = a + 864e5;
            wx.setStorageSync("cishu_expiration", t), wx.setStorageSync("cishu", 0), wx.setStorageSync("cishutip", !1);
        }
    },
    NavChange: function(t) {
        var a = t.currentTarget.dataset.cur;
        wx.navigateTo({
            url: "/yj_yishuzi/" + a + "/index"
        });
    },
    
    //加载激励广告
    adGet: function () {
  
      if (wx.createRewardedVideoAd) {
        // 加载激励视频广告
        videoAd = wx.createRewardedVideoAd({
          adUnitId: 'adunit-df1ef2199269a40e'//你的广告key
        })
        //捕捉错误
        videoAd.onError(err => {
            console.log("获取视频失败");
          // 进行适当的提示
        })
        // 监听关闭
        videoAd.onClose((status) => {
          if (status && status.isEnded || status === undefined) {
            // 正常播放结束，下发奖励
            // continue you code
            wx.showModal({
                title: '恭喜你',
                content: '密码是6666',
                success: function (res) {
                  if (res.confirm) {//这里是点击了确定以后
                    console.log('用户点击确定')
                  } else {//这里是点击了取消以后
                    console.log('用户点击取消')
                  }
                }
              })
          } else {
            wx.showModal({
                title: '温馨提示',
                content: '现在退出将无法获取密码，您确定不再看看吗？',
                success: function (res) {
                  if (res.confirm) {//这里是点击了确定以后
                    console.log('用户点击确定')
                  } else {//这里是点击了取消以后
                    console.log('用户点击取消')
                  }
                }
              })
            // 播放中途退出，进行提示
          }
        })
      }
    },


    //激励广告展示，函数名称是随意的，和前面对应就行了。
  openVideoAd() {
    console.log('打开激励视频');

    wx.showToast({
      title: '广告完成后获取密码',
      icon: 'none',
      duration: 2000
    });
    this.adGet();//这个地方就是调用了广告函数，然后直接展示

    // 在合适的位置打开广告
    if (videoAd) {
      videoAd.show().catch(err => {
        // 失败重试
        videoAd.load()
          .then(() => videoAd.show())
      })
    }
  },
    onShareTimeline: function() {
        return {
            title: "免费设计一个属于你的个性签名，快来试试吧",
            imageUrl: "../../images/icons/py.png"
        };
    }
});