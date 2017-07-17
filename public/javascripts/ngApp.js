'use strict';
var ngApp = angular.module('ngApp', ["ui.router", 'angular-loading-bar']);

ngApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('', '/blog');
    $stateProvider
        .state('blog', {
            url: '/blog',
            controller: 'ngBlogCtl',
            templateUrl: '/blog/index'
        })
        .state('article', {
            url: '/blog/:aid',
            controller: 'ngArticleCtl',
            templateUrl: '/blog/article'
        });
});

ngApp.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = true;
    cfpLoadingBarProvider.includeBar = true;
    cfpLoadingBarProvider.latencyThreshold = 10;
}]);

ngApp.controller('ngBlogCtl', function ($scope, ngFactory) {

    ngFactory.pageBlog(1).then(function (resp) {
        $scope.articles = resp.data.data;
        $scope.pageinfo = resp.data;
        $scope.preBtn = "";
        $scope.nextBtn = "";
        if (!$scope.pageinfo.hasPre) {
            $scope.preBtn = "disabled";
        }
        if (!$scope.pageinfo.hasNext) {
            $scope.nextBtn = "disabled";
        }
    });

    $scope.pagesubmit = function(start) {
        if ($scope.pageinfo.start == start) {
            return;
        }

        ngFactory.pageBlog(start).then(function (resp) {
            $scope.articles = resp.data.data;
            $scope.pageinfo = resp.data;
            $scope.preBtn = "";
            $scope.nextBtn = "";
            if (!$scope.pageinfo.hasPre) {
                $scope.preBtn = "disabled";
            }
            if (!$scope.pageinfo.hasNext) {
                $scope.nextBtn = "disabled";
            }
        });
    };

});

ngApp.controller('ngArticleCtl', function ($scope, $http, $stateParams) {
    var aid = $stateParams.aid;
    $http({
        method:'GET',
        url: '/blog/'+aid+'/get'
    }).then(function successCallback(response) {
        $scope.article = response.data;
        $scope.articleId = response.data.articleId;
        $scope.mainTitle = response.data.mainTitle;
        $scope.subTitle = response.data.subTitle;
        $scope.content = response.data.content;
        $scope.clicks = response.data.clicks;
        $scope.blogStatus = response.data.blogStatus;
        $scope.blogType = response.data.blogType;
        $scope.userId = response.data.userId;
        $scope.createTime = response.data.createTime;

    }, function errorCallback(response) {
        // error response
    });
});

ngApp.filter('trustHtml', function ($sce) {
    return function (input) {
        return $sce.trustAsHtml(input);
    }
});

ngApp.factory("ngFactory", function ($http) {
    return {
        /*allTags: function () {
            return $http.get("/blog/tags");
        },*/

        pageBlog: function (start) {
            return $http.get("/blog/"+start+"/list/");
        },

        article: function () {
            return $http.get("/blog/get/");
        }
    }
});