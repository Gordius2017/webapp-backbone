(function (module) {
    'use strict';

    var authPasswordDirective = function () {
        return {
            require: "?ngModel",
            scope: true,
            templateUrl: "app/templates/authPassword.html"
        };
    };

    module.directive("passwordInput", authPasswordDirective);

}(angular.module("trackingApp")));