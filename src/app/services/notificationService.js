(function (module) {

    var notificationService = function ($http, serverUrl) {
        var headers = {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS',
            'Accept': 'application/json'
        };

        var getNotifications = function (user_id) {
            return $http({
                url: serverUrl + "notifications?id=" + user_id,
                method: 'GET',
                headers: headers
            });
        };

        return {
            getNotifications: getNotifications
        };
    };

    module.factory("notificationService", notificationService);
}(angular.module("trackingApp")));