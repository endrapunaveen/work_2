/*(function() {
    'use strict';

    angular.module('datepickerapp').controller('LeaveDetailCtrl',
     ['$state', '$stateParams', '$ionicPopup', '$scope', '$rootScope','Leaves', LeaveDetailCtrl]);

        function LeaveDetailCtrl($state, $stateParams, $scope, $rootScope, $ionicPopup, Leaves) {
            var vm = this;

            var leaveId = $stateParams.leaveId;

             vm.loadLeaveDetail = function(forceRefresh) {
                Leaves.getLeaveDetails(leaveId).then(function(_data) {
                    vm.leave = _data.data;
                    vm.loggedIn_UserId = $rootScope.getToken();                
                });                        

            vm.submitComment = function() {
                console.log('About to Comment :'+$rootScope.getUserName());
                vm.comments = {
                    "name" : $rootScope.getUserName(),
                    "text" : vm.newComment,
                    "date" : new Date()
                };

                Leaves.addComment(leaveId, vm.comments)
                .success(function (data) {
                    console.log('Coment Added');
                })
                .error(function (data) {
                  console.log("error"+JSON.stringify(data));
                    $scope.notify("Oops something went wrong!! Please try again later");
                });   

                console.log('Done adding comment :'+vm.comments);

                $state.go("app.leaves");

            };

            

            // Triggered on a button click, or some other target            
            vm.showCancelConfirm = function() {
                var confirmPopup = $ionicPopup.confirm({
                   title: 'Cancel Leave',
                   template: 'Are you sure you want to cancel Leave Request?'
                 });
                 confirmPopup.then(function(res) {
                   if(res) {
                     console.log('Yes, Cancel');
                   } else {
                     console.log('No, don not cancel');
                   }
                 });
            };

            // Triggered on a button click, or some other target            
            vm.showApproveConfirm = function() {
                var confirmPopup = $ionicPopup.confirm({
                   title: 'Cancel Leave',
                   template: 'Are you sure you want to cancel Leave Request?'
                 });
                 confirmPopup.then(function(res) {
                   if(res) {
                     console.log('Yes, Cancel');
                   } else {
                     console.log('No, don not cancel');
                   }
                 });
            };

        };

        vm.loadLeaveDetail(true);
    };

})();
*/