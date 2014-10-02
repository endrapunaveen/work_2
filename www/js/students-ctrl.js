(function() {
    'use strict';

    angular.module('datepickerapp').controller('StudentsCtrl', ['$scope', '$rootScope','Leaves', 'AuthenticationService', StudentsCtrl]);

        function StudentsCtrl($scope, $rootScope, Leaves, AuthenticationService) {
            var vm = this;

        /*    scope.$on('handleBroadcast', function() {
                $scope.message = 'ONE: ' + sharedService.message;

                console.log('ONE :'+$scope.message);
            });
        */
            console.log('Inside StudentsCtrl :');
            vm.userProfile = AuthenticationService.getUserProfile();               
            console.log('Inside StudentsCtrl :'+vm.userProfile);
            
            vm.loadList = function(forceRefresh) {
                Leaves.all().then(function(_data) {
                    vm.leaves = _data.data;
                     vm.loggedIn_UserId = $rootScope.getToken();


            });

            vm.getStatusClass = function(status){
                if (status == 'Approved') {
                    return 'badge badge-balanced';
                } 
                else if (status == 'Cancelled') {
                    return 'badge badge-calm';
                } 
                else if( status == 'Pending') {
                    return 'badge badge-energized';
                }
                else {
                    return 'badge badge-assertive';
                };
            };

            vm.compareStatus = function(status1, status2){
                if( status1 == status2){
                    return true;
                } else {
                    return false;
                }
            };
        };

        vm.loadList(true);
       
    };
})();
