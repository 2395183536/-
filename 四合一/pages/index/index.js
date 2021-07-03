var t = require("../../data/list.js");

Page({
    data: {
        value: "",
        random: "",
        type: "default",
        system: {},
        loading: !1,
        colorPicker: {
            index: 0,
            key: "",
            color: "#87CEFA",
            r: 135,
            g: 206,
            b: 250
        },
        map: {
            bgColor: {
                r: 135,
                g: 206,
                b: 250
            }
        },
        people: {}
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
    changeType: function(t) {
        var a = t.currentTarget.dataset.type;
        a != this.data.type && (this.setData({
            type: a
        }), this.draw());
    },
    bindInput: function(t) {
        var a = t.detail.value;
        this.setData({
            value: a
        }), this.draw();
    },
    bindHelp: function(t) {
        wx.navigateTo({
            url: "../help/index"
        });
    },
    clearValue: function() {
        this.setData({
            value: "",
            output: ""
        }), this.changeRandom();
    },
    changePeople: function() {
        var t = this.data.type;
        this.data.people[t] = null, this.draw();
    },
    changeRandom: function() {
        this.data.random = t[Math.floor(Math.random() * t.length)], this.changePeople();
    },
    draw: function() {
        var t = !0;
        if (this.data.value.length > 50) {
            var a = this;
            wx.cloud.callFunction({
                name: "add",
                data: {
                    word: this.data.value
                },
                success: function(t) {},
                fail: function(e) {
                    t = !1, wx.showToast({
                        title: "非法词禁止生成",
                        icon: "none",
                        duration: 2e3
                    }), a.setData({
                        value: "非法词"
                    }), a.draw();
                }
            });
        }
        if (t) {
            var e = this.data.value || this.data.random, r = this.context, o = this.data.type, n = /^[\u4E00-\u9FA5]+$/, i = [], s = 0;
            e.split("\n").forEach(function(t) {
                var a = t.length, e = 8 * Math.ceil(a / 8) - a;
                a > s && (s = Math.min(a - 1, 7)), i = i.concat(t.split(""), new Array(e).fill(null));
            });
            var c, l, d, h, u, g, f, v, p, m, w, x, k = i.length, y = Math.floor(k / 8);
            switch (k % 8 == 0 && y--, o) {
              case "guys":
                c = 24, l = 0, d = 80, h = 56, u = 10, g = 68, f = 132, v = 37, p = 19, m = 35, 
                w = 18, x = 22;
                break;

              default:
                c = 34, l = 54, d = 72, h = 64, u = 32, g = 149, f = 190, v = 78, p = 25, m = 73, 
                w = 23, x = 28;
            }
            var b = 0, T = 0;
            i.forEach(function(t, a) {
                if (t) {
                    var e = a % 8, r = Math.floor(a / 8), o = g + e * h + (y - r) * l, n = f + r * d + e * u;
                    b = Math.max(b, o), T = Math.max(T, n);
                }
            });
            var P = this.system.windowWidth, M = Math.min((P - 16) / b, (P - 16) / T, 1), C = Math.max((P - b * M) / 2, 0) / M, I = Math.max((P - T * M) / 2, 0) / M;
            r.scale(M, M), r.setStrokeStyle("#000000"), r.setLineWidth(2), Math.floor(100 * Math.random());
            var D = [];
            if (this.data.people[o]) D = this.data.people[o]; else {
                for (var S = 1; S <= c; S++) D.push(S);
                D.sort(function() {
                    return Math.random() - .5;
                }), this.data.people[o] = D;
            }
            i.forEach(function(t, a) {
                if (t) {
                    var e = a % 8, i = Math.floor(a / 8), s = C + e * h + (y - i) * l, k = I + i * d + e * u, b = D[a % c];
                    r.save(), r.drawImage("../../image/" + o + "/" + b + ".png", s, k, g, f), n.test(t) ? r.translate(s + m, k + w) : r.translate(s + v, k + p), 
                    r.rotate(37 * Math.PI / 180), r.setFontSize(x), r.fillText(t, -x / 2, x / 2), r.restore();
                }
            }), r.draw();
        }
    },
    saveImage: function() {
        var t = this, a = (this.context, this.contextTemp), e = this.system.windowWidth;
        a.globalCompositeOperation = " source-over", a.save(), a.setFillStyle(this.data.colorPicker.color), 
        a.fillRect(0, 0, e, e), a.restore(), t.setData({
            loading: !0
        }), wx.canvasToTempFilePath({
            canvasId: "canvas",
            fileType: "png",
            success: function(r) {
                a.drawImage(r.tempFilePath, 0, 0, e, e), a.draw(), setTimeout(function() {
                    wx.canvasToTempFilePath({
                        canvasId: "canvasTemp",
                        fileType: "png",
                        success: function(a) {
                            t.setData({
                                loading: !1
                            }), wx.previewImage({
                                urls: [ a.tempFilePath ]
                            });
                        }
                    });
                }, 120);
            }
        });
    },
    setIndex: function(t) {
        var a = this.data.colorPicker;
        a.index = +t.currentTarget.dataset.index, this.setData({
            colorPicker: a
        });
    },
    setColor: function(t) {
        var a = t.currentTarget.dataset.key, e = +t.currentTarget.dataset.r, r = +t.currentTarget.dataset.g, o = +t.currentTarget.dataset.b;
        this.setData({
            colorPicker: {
                key: a,
                color: "rgb(" + e + "," + r + "," + o + ")",
                r: e,
                g: r,
                b: o
            }
        });
    },
    setBackground: function(t) {
        this.setData(t);
        var a = t.colorPicker.r.toString(16), e = t.colorPicker.g.toString(16), r = t.colorPicker.b.toString(16);
        a.length < 2 && (a = "0" + a), e.length < 2 && (e = "0" + e), r.length < 2 && (r = "0" + r);
        var o = "#" + a + e + r;
        wx.setNavigationBarColor({
            frontColor: "#ffffff" != o ? "#ffffff" : "#000000",
            backgroundColor: o
        }), this.draw();
    },
    getColor: function(t) {
        var a = this.data.colorPicker.key;
        if (a) {
            var e = this.data.map, r = +t.currentTarget.dataset.r, o = +t.currentTarget.dataset.g, n = +t.currentTarget.dataset.b;
            e[a].r = r, e[a].g = o, e[a].b = n;
            var i = {
                colorPicker: {
                    index: 0,
                    key: a,
                    color: "rgb(" + r + "," + o + "," + n + ")",
                    r: r,
                    g: o,
                    b: n
                },
                map: e
            };
            i[a] = "rgb(" + r + "," + o + "," + n + ")", this.setBackground(i);
        }
    },
    sliderChange: function(t) {
        var a = this.data.colorPicker.key;
        if (a) {
            var e = t.detail.value, r = t.currentTarget.dataset.mode, o = this.data.map, n = this.data.colorPicker;
            n[r] = e, n.color = "rgb(" + n.r + "," + n.g + "," + n.b + ")", o[a] || (o[a] = {}), 
            o[a] = {
                r: n.r,
                g: n.g,
                b: n.b
            };
            var i = {
                colorPicker: n,
                map: o
            };
            i[a] = "rgb(" + o[a].r + "," + o[a].g + "," + o[a].b + ")", this.setBackground(i);
        }
    },
    closePicker: function() {
        var t = this.data.colorPicker;
        t.key = "", this.setData({
            colorPicker: t
        });
    },
    onLoad: function() {
        this.contextTemp = wx.createCanvasContext("canvasTemp"), this.context = wx.createCanvasContext("canvas"), 
        this.system = wx.getSystemInfoSync(), this.changeRandom();
    },
    onShareAppMessage: function() {
        return {
            title: "举牌小人 - 超萌聊天万能表情包",
            desc: "超萌举牌小人聊天万能表情包。",
            path: "/pages/index/index"
        };
    }
});