(function() {
    'use strict';

    angular.module('datepickerapp').controller('ClassesCtrl', ['$scope', '$rootScope','Leaves', 'AuthenticationService', ClassesCtrl]);

        function ClassesCtrl($scope, $rootScope, Leaves, AuthenticationService) {
            var vm = this;
        
            console.log('Inside ClassesCtrl :');
            vm.userProfile = AuthenticationService.getUserProfile();               
            console.log('Inside ClassesCtrl :'+vm.userProfile);
            
            vm.loadList = function(forceRefresh) {
                Leaves.allClasses().then(function(_data) {
                    vm.classes = _data.data;
                    vm.loggedIn_UserId = $rootScope.getToken();
            });

            
        };

        vm.loadList(true);
       
    };
})();
