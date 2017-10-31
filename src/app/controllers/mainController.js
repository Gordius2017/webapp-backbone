(function (module) {
    'use strict';

    var mainController = function ($scope, $http, $interval, $location, $window, authenticationService, notificationService, toastr) {
        var vm = this;
        vm.frame = "";
        vm.access = "";
        vm.account = "";
        vm.showLoginButton = false;

        var j= 0, counter = 0;
        vm.mode = 'query';
        vm.activated = true;
        vm.determinateValue = 0;
        vm.determinateValue2 = 0;

        vm.showList = [];
            
        vm.register = function(nm,ids) {
            $http({
                method: 'POST',
                url: "http://10.5.5.53:80/addNewUser",
                body: {name: nm, id: ids}
            }).success(function () {});

            $location.path("/register");  
        };

        $interval(function() {
            vm.determinateValue += 0.6;
            vm.determinateValue2 += 1.2;
        
            // if (vm.determinateValue > 100) vm.determinateValue = 30;
            // if (vm.determinateValue2 > 100) vm.determinateValue2 = 30;
        
            // Incrementally start animation the five (5) Indeterminate,
            // themed progress circular bars
    
            if ( (j < 2) && !vm.showList[j] && vm.activated ) {
            vm.showList[j] = true;
            }
            if ( counter++ % 4 === 0 ) {j++;}
    
            // Show the indicator in the "Used within Containers" after 200ms delay
            if ( j == 2 ) {vm.contained = "indeterminate";}
        
        }, 100, 0, true);
    
        $interval(function() {
            vm.mode = (vm.mode == 'query' ? 'determinate' : 'query');
        }, 7200, 0, true);

        // defined a connection to a new socket endpoint
        var socket = new SockJS('http://localhost:8080/liveframe-websocket');
        var stompClient = Stomp.over(socket);
        stompClient.connect({ }, function(frame) {
            // subscribe to the /topic/message endpoint
            stompClient.subscribe("/topic/frames", function(data) {
                vm.frame = data.body;
                $scope.$apply();
            });
            stompClient.subscribe("/topic/notification", function(data) {
                if(data.body === "grant") {
                    toastr.success('Hello happy human!', 'Ahoy');     
                    $location.path("/home");                      
                } else {
                    vm.showLoginButton = vm.showRegisterButton = true;
                    toastr.error('We were not able to recognize you :(', 'Oupsy');                    
                }
                $scope.$apply();
            });

            stompClient.subscribe("/topic/account", function(data) {
                vm.account = data.body;
            });
        });
        
        vm.reloadPage = function(){window.location.reload();};
    };

    module.controller("mainController", mainController);

}(angular.module("trackingApp")));