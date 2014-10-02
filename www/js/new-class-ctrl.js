(function() {
    'use strict';

    angular.module('datepickerapp').controller('newClassCtrl', 
        ['$scope', '$rootScope','Leaves', 'AuthenticationService', newClassCtrl]);
    //function($rootScope, $scope,$ionicModal, $ionicPopup, Leaves, AuthenticationService)

        function newClassCtrl($scope, $rootScope, Leaves, AuthenticationService) {
            var vm = this;
        
            console.log('Inside newClassCtrl :');
            vm.userProfile = AuthenticationService.getUserProfile();               
            console.log('Inside newClassCtrl :'+vm.userProfile);
            
            vm.loadList = function(forceRefresh) {
                Leaves.allClasses().then(function(_data) {
                    vm.classes = _data.data;
                    vm.loggedIn_UserId = $rootScope.getToken();
            });
            
            vm.class = {};
            
            $scope.createClass = function() {
                
                /*
                if(!vm.class.school) {
                  alert('School required');
                  return;
                }

                if(!vm.class.groupDesc) {
                  alert('Class Name is required');
                  return;
                }
                */
                
                vm.class.status ='Active';
                vm.class._id = "S_100";

                //$scope.data.requestor = $rootScope.getUserName();

                //$scope.data.requestedOn = new Date();

                Leaves.saveClass(vm.class)
                .success(function (data) {
                    console.log('Class Added...'+JSON.stringify(data));
                    $scope.showForm = false; 
                    //$scope.leaves.push(data);
                })
                .error(function (data) {
                  console.log("Add Class : error"+JSON.stringify(data));
                    //$scope.notify("Oops something went wrong!! Please try again later");
                });
              
            };


            
        };

        vm.loadList(true);
       
    };
})();
