var express = require('express');
var request = require('request');
var router = express.Router();

// 关于首页
router.get('/', function(req, res, next) {
    res.render('about/me');
});
