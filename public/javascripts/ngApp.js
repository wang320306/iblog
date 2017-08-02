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
            url: '/blog/:date/:id',
            controller: 'ngArticleCtl',
            templateUrl: '/blog/article'
        });
});

ngApp.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = true;
    cfpLoadingBarProvider.includeBar = true;
    cfpLoadingBarProvider.latencyThreshold = 100;
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

        if (!start){
            return;
        }

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

ngApp.controller('ngArticleCtl', function ($scope, ngFactory, $http, $stateParams) {
    if ($stateParams.id && $stateParams.date) {
        ngFactory.getBlog($stateParams.id, $stateParams.date).then(function (response) {
            $scope.article = response.data;
        });
    }
});

ngApp.factory("ngFactory", function ($http) {
    return {
        // get blog list by page
        pageBlog: function (start) {
            return $http.get("/blog/"+start+"/list/");
        },
        // get article info
        getBlog: function (id, date) {
            return $http.get("/blog/" + date + "/" + id + "/get");
        }
    }
});

ngApp.filter('trustHtml', function ($sce) {
    return function (input) {
        return $sce.trustAsHtml(input);
    }
});
