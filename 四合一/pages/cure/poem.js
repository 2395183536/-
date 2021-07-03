require("../../AF69DFF5BC64A5DFC90FB7F2A9B24571.js");

var e = require("../../AE450F94BC64A5DFC823679305A24571.js"), t = require("../../71CC79E6BC64A5DF17AA11E1F0B24571.js"), a = getApp();

Page({
    data: {
        userInfo: {},
        logged: !1,
        sensitive: a.sensitive,
        appenv: a.appEnv,
        articleList: {},
        listSort: !1,
        redDot: !1,
        loadMore: !0,
        nextPage: !1,
        isShareDialogShow: !1,
        shareQuanImage: "",
        shareUserImage: "",
        clickShareArticleId: 0,
        clickShareArticleIndex: 0
    },
    bindGetUserInfo: function(e) {
        e.detail.userInfo && t.userLogin(this, a, function(e, t) {
            wx.navigateTo({
                url: "./publish/publish"
            });
        });
    },
    changeSort: function() {
        var t = this;
        t.setData({
            listSort: !t.data.listSort
        }), t.data.listSort && (t.setData({
            redDot: !1
        }), wx.setStorageSync("cureRedDotTime", new Date().getTime())), this.getPoemArticleList(1, e.setting.pageSize);
    },
    getPoemArticleList: function(e, i) {
        var r = this.data.listSort ? 1 : 2;
        t.getArticleList(this, a, e, i, 2, r);
    },
    clickLike: function(e) {
        t.articleLikeClick(this, a, e);
    },
    goArticle: function(e) {
        wx.navigateTo({
            url: "/pages/article/article?docId=" + e.currentTarget.dataset.articleId
        }), t.submitFormId(e, a);
    },
    disMove: function() {},
    clickNull: function() {
        return !0;
    },
    showShareDialog: function(e) {
        var i = e.currentTarget.dataset.articleId, r = e.currentTarget.dataset.articleIndex;
        console.log("articleShareClick", i, r), t.doCaptureAndShare(this, a, i, r);
    },
    hideShareDialog: function() {
        this.setData({
            isShareDialogShow: !1
        });
    },
    shareToShuo: function(e) {
        t.showBusy("正在获取海报");
        var i = e.currentTarget.dataset.articleId, r = e.currentTarget.dataset.articleIndex;
        console.log("shareToShuoClick", i, r), wx.reportAnalytics("share_article", {
            share_type: "shareShuo",
            article_id: i
        });
        var o = this;
        wx.downloadFile({
            url: o.data.shareQuanImage,
            success: function(e) {
                console.log(e), wx.hideLoading();
                var t = Math.round(Math.random() * (a.shareTextList.length - 1));
                qq.openQzonePublish({
                    text: a.shareTextList[t],
                    media: [ {
                        type: "photo",
                        path: e.tempFilePath
                    } ]
                });
            },
            fail: function() {
                wx.hideLoading(), console.log("图片下载失败，使用默认文案发说说"), qq.openQzonePublish({
                    text: o.data.articleList[r].content
                });
            }
        });
    },
    saveShareImage: function(e) {
        t.showBusy("正在保存海报");
        var a = e.currentTarget.dataset.articleId, i = e.currentTarget.dataset.articleIndex;
        console.log("saveShareImageClick", a, i), wx.reportAnalytics("share_article", {
            share_type: "saveImage",
            article_id: a
        });
        var r = this;
        wx.downloadFile({
            url: r.data.shareQuanImage,
            success: function(e) {
                console.log(e), wx.saveImageToPhotosAlbum({
                    filePath: e.tempFilePath,
                    success: function(e) {
                        console.log("图片保存成功", e), t.showSuccess("图片保存成功");
                    },
                    fail: function(e) {
                        wx.hideLoading(), console.log("图片保存失败", e), wx.showModal({
                            title: "保存失败",
                            content: "图片保存失败，请检查图片保存设置是否打开",
                            confirmText: "前往设置",
                            showCancel: !0,
                            success: function(e) {
                                e.confirm && (console.log("图片保存失败弹窗下，用户点击前往设置"), wx.openSetting());
                            }
                        });
                    }
                });
            },
            fail: function() {
                wx.hideLoading(), console.log("图片下载失败"), t.showNetErrorModel("图片下载保存失败，请稍候重试");
            }
        });
    },
    onShareAppMessage: function(e) {
        wx.reportAnalytics("share_article", {
            share_type: "friend",
            article_id: this.data.clickShareArticleId
        });
        var t = Math.round(Math.random() * (a.shareTextList.length - 1));
        return {
            title: a.shareTextList[t],
            path: "/pages/index/index?docId=" + this.data.clickShareArticleId,
            imageUrl: this.data.shareUserImage
        };
    },
    onLoad: function(t) {
        this.getPoemArticleList(1, e.setting.pageSize);
    },
    onShow: function() {
        t.updateUserInfoToPage(this, a);
        for (var e = this, i = 0; i < e.data.articleList.length; i++) {
            var r = t.checkIsLiked(e, a, e.data.articleList[i].id);
            e.data.articleList[i].isLiked = r, e.data.articleList[i].likeAnim = !1;
        }
        e.setData({
            articleList: e.data.articleList
        });
        var o = wx.getStorageSync("cureRedDotTime");
        new Date().getTime() - o > 2592e5 && (console.log("红点时间超过7天，需要展示红点"), this.setData({
            redDot: !0
        }));
    },
    onPullDownRefresh: function() {
        this.getPoemArticleList(1, e.setting.pageSize);
    },
    onReachBottom: function() {
        this.data.loadMore && this.getPoemArticleList(this.data.nextPage, e.setting.pageSize);
    },
    onShareTimeline: function() {
        return {
            title: "分享给你一个文案，请你查收",
            imageUrl: "../../images/icons/py.png"
        };
    }
});