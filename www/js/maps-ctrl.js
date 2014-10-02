/*

(function() {
    'use strict';

    angular.module('datepickerapp').controller('MapsCtrl', 
        ['$scope', '$ionicLoading', '$compile', MapsCtrl]);

        function MapsCtrl($scope, $ionicLoading, $compile) {
            var vm = this;

            vm.initialize = function() {
                var myLatlng = new google.maps.LatLng(12.99406909942627,77.72931671142578);
                
                var mapOptions = {
                  center: myLatlng,
                  zoom: 16,
                  mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                var map = new google.maps.Map(document.getElementById("map"),
                    mapOptions);
                
                //Marker + infowindow + angularjs compiled ng-click
                var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
                var compiled = $compile(contentString)($scope);

                var infowindow = new google.maps.InfoWindow({
                  content: compiled[0]
                });

                var marker = new google.maps.Marker({
                  position: myLatlng,
                  map: map,
                  title: 'Uluru (Ayers Rock)'
                });

                google.maps.event.addListener(marker, 'click', function() {
                  infowindow.open(map,marker);
                });

                $scope.map = map;
            }
            
            google.maps.event.addDomListener(window, 'load', initialize);
      
              $scope.centerOnMe = function() {
                if(!$scope.map) {
                  return;
                }

                $scope.loading = $ionicLoading.show({
                  content: 'Getting current location...',
                  showBackdrop: false
            });

            navigator.geolocation.getCurrentPosition(function(pos) {
              $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
              $scope.loading.hide();
            }, function(error) {
              alert('Unable to get location: ' + error.message);
            });
          };
          
          $scope.clickTest = function() {
            alert('Example of infowindow with ng-click')
          };

          vm.initialize();
      
    };            
})();
*/