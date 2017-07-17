var express = require('express');
var request = require('request');
var router = express.Router();

var ServerContents = require("../commons/ServerContents");
var serverConstant = new ServerContents();

// 博客首页
router.get('/index', function(req, res, next) {
    console.log("进入博客首页");
    res.render('blog/list.html');
});

// 获取文章列表
router.get('/:start/list', function(req, res, next) {
    var start = req.params.start;
    console.log("开始获取"+start);
    if (typeof(start) == "undefined" || start == null || start == "") {
        console.log("设置默认分页起始数");
        start = serverConstant.getPageStartDefault();
    }

    var url = serverConstant.getBackServerUrl() + "/article/" + start + "/list";
    console.log("获取博客文章列表url"+ url);

    request.get(url, function(error, response, body) {

        if (null != error) {
            res.render('error/error_unknown');
        }

        console.error("statusCode:" + response.statusCode)
        if (200 != response.statusCode) {
            res.render('error/error');
        }

        //console.log(body);
        var result = JSON.parse(body);

        var returnCode = result.returnCode;
        console.log("returnCode:" + returnCode);
        var returnMsg = result.returnMsg;
        console.log("returnMsg:" + returnMsg);

        if (0 == returnCode) {
            res.json(result.data);
        }

    });

});

// 获取标签集合
router.get('/tags', function(req, res, next) {
    console.log("获取博客标签集合");
    var url = serverConstant.getBackServerUrl() + "/article/tags";
    request.get(url, function(error, response, body) {
        var bo = JSON.parse(body);
        res.json(bo.dataList);
    });
});

// 博客详细页面
router.get('/article', function(req, res, next) {
    console.log("进入博客详细页面");
    res.render('blog/article.html');
});

// 获取文章详细
router.get("/:id/get", function (req, res, next) {
    var id = req.params.id;
    console.log("开始获取文章详情:" + id);
    if (typeof(id) == "undefined" || id == null || id == "") {
        res.render('error/error');
    }

    var url = serverConstant.getBackServerUrl() + "/article/list/" + id;
    console.log("获取文章内容url"+ url);
    request.get(url, function(error, response, body) {
        if (null != error) {
            res.render('error/error_unknown');
        }

        console.error("statusCode:" + response.statusCode)
        if (200 != response.statusCode) {
            res.render('error/error');
        }

        console.log(body);
        var result = JSON.parse(body);

        var returnCode = result.returnCode;
        console.log("returnCode:" + returnCode);
        var returnMsg = result.returnMsg;
        console.log("returnMsg:" + returnMsg);

        if (0 == returnCode) {
            res.json(result.data);
        }

    });
});


module.exports = router;
