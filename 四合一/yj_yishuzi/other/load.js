Page({
    data: {
        url: ""
    },
    onLoad: function(e) {
        wx.hideShareMenu(), this.setData({
            url: decodeURIComponent(e.url)
        });
    }
});