(function (module) {
    'use strict';

    var authEmailDirective = function () {
        return {
            require: "?ngModel",
            scope: true,
            templateUrl: "app/templates/authEmail.html"
        };
    };

    module.directive("emailInput", authEmailDirective);

}(angular.module("trackingApp")));