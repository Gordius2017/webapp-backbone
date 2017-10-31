(function () {
    'use strict';

    angular.module("trackingApp", ["ngRoute", "ngMessages", "ngMap", "googlechart", "ngAnimate", "toastr", "ngMaterial"])
        .constant("serverUrl", "http://127.0.0.1:8080/")
        .config(function ($routeProvider) {
            $routeProvider.when("/login", {
                templateUrl: "app/views/login.html"
            });
            $routeProvider.when("/home", {
                templateUrl: "app/views/home.html"
            });
            $routeProvider.when("/register", {
                templateUrl: "app/views/register.html"
            });
            $routeProvider.when("/input", {
                templateUrl: "app/views/input.html"
            });
            $routeProvider.otherwise({
                templateUrl: "app/views/login.html"
            });
        })
        .config(function($mdThemingProvider) {
        });
}());