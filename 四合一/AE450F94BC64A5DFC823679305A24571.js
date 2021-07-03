var e, r, t = "https://ma.youdu.duzaa.com", l = {
    service: {
        host: e = t,
        host_capture: r = "https://capture.duzaa.com",
        loginUrl: e + "/login",
        userInfoUrl: e + "/user",
        userRegisterUrl: e + "/user/register",
        sensitiveStateUrl: e + "/config",
        articleListUrl: e + "/article",
        articleRankUrl: e + "/rank",
        articleForumUrl: e + "/forum",
        forumPublishUrl: e + "/forum/publish",
        articleMyPubUrl: e + "/forum/mine",
        deleteOneDocUrl: e + "/article/delete",
        articleCommentUrl: e + "/comment",
        commentPublishUrl: e + "/comment/publish",
        commentMyPubUrl: e + "/comment/mine",
        articleOneUrl: e + "/article/one",
        articleLikeUrl: e + "/like",
        formidSubmitUrl: e + "/formid/post",
        articlePageHtml: e + "/page/doc",
        articleCaptureUrl: r + "/capture.php"
    },
    setting: {
        version: "507",
        pageSize: 10
    }
};

module.exports = l;