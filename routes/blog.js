var express = require('express');
var request = require('request');
var router = express.Router();

var ServerContents = require("../commons/ServerContents");
var serverConstant = new ServerContents();

// 博客首页
router.get('/index', function(req, res, next) {
    res.render('blog/list.html');
});

// 博客首页获取文章列表
router.get('/:start/list', function(req, res, next) {

    // 获取起始数目
    var start = req.params.start;
    if (typeof(start) == "undefined" || start == null || start == "") {
        start = serverConstant.getPageStartDefault();
    }

    // 发送get请求获取内容
    var url = serverConstant.getBackServerUrl() + "/article/" + start + "/list";
    request.get(url, function(error, response, body) {

        if (null != error) {
            res.render('error/error_unknown');
            return;
        }

        if (200 == response.statusCode) {
            var result = JSON.parse(body);
            console.log("return: " + body);
            var returnCode = result.returnCode;
            console.log("returnCode:" + returnCode);
            var returnMsg = result.returnMsg;
            console.log("returnMsg:" + returnMsg);

            if (0 == returnCode) {
                res.json(result.data);
            }
            else {

            }
        } else {
            res.render('error/error');
            return;
        }

    });

});

// 博客详细页面
router.get('/article', function(req, res, next) {
    res.render('blog/article.html');
});

// 博客详细页面获取内容
router.get("/:date/:id/get", function (req, res, next) {

    var date = req.params.date;
    var id = req.params.id;
    if (typeof(id) == "undefined" || id == null || id == "" || typeof(date) == "undefined" || date == null || date == "") {
        res.render('error/error_text');
        return;
    }

    var url = serverConstant.getBackServerUrl() + "/article/list/" + date + id;
    console.log("获取文章内容url", url);
    request.get(url, function(error, response, body) {
        if (error) {
            res.render('error/error_text');
            return;
        }

        if (response && 200 != response.statusCode) {
            res.render('error/error_text');
            return;
        }

        var result = JSON.parse(body);
        var returnCode = result.returnCode;

        if (null == result.data){
            console.log("response body null.");
            res.render('error/error_text');
            return;
        }

        if (0 == returnCode) {
            res.json(result.data);
        }
        else {
            res.render('error/error_text');
        }

    });
});


module.exports = router;
