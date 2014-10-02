angular.module('datepickerapp.controllers', ['pickadate'])



//.controller('LeavesCtrl', function($scope, $ionicModal, $ionicPopup, Leaves) {
  
  /*
  if ($rootScope.isSessionActive()) {
    $window.location.href = ('#/auth/signin');
  }
  */
  //console.log('Get Leaves ....')
  /*
  Leaves.all()
    .success(function (result) {
      console.log("Success ... :" + result)
      $scope.leaves =  result.data;
    })
    .error(function (_error) {
      console.log("error :" + _error);
      //$scope.notify("Oops something went wrong!! Please try again later");
   });
  */
  /*
   Leaves.all().then(function (_data) {
                    $scope.leaves = _data.data;
                })
            }, function (_error) {
                console.log("error");
                  
})
*/  
/*
.controller('leaveDetailsCtrl', function($stateParams, $rootScope, $scope, Leaves) {
  
  /*
  if ($rootScope.isSessionActive()) {
    $window.location.href = ('#/auth/signin');
  }
  */
/*
  var leaveId = $stateParams.leaveId;

   Leaves.getLeaveDetails(leaveId).then(function (_data) {
                    $scope.leave = _data.data;
                })
            }, function (_error) {
                console.log("error");
})
*/

.controller('LeaveDetailCtrl',
     function($state, $stateParams, $scope, $rootScope, $ionicPopup, $window, Leaves) {
            var vm = this;

            var leaveId = $stateParams.leaveId;

            vm.getUserRole = function(userId, parents) {
              angular.forEach(parents, function(parent){
                if (parent.id == userId) {
                  console.log('Parent .....')
                  return 'Parent';
                }
              })
            };

             vm.loadLeaveDetail = function(forceRefresh) {
                Leaves.getLeaveDetails(leaveId).then(function(_data) {
                  vm.leave = _data.data;
                  vm.loggedIn_UserId = $rootScope.getToken();
                    
                  angular.forEach(vm.leave.parents, function(parent){
                    if (parent.id == vm.loggedIn_UserId) {
                      console.log('Parent .....')
                      vm.userRole = 'Parent';
                    }
                  });

                  angular.forEach(vm.leave.approvers, function(approver){
                    if (approver.id == vm.loggedIn_UserId) {
                      console.log('Approver .....')
                      vm.userRole = 'Approver';
                    }
                  });
                });                        
            };




            vm.loadLeaveDetail(true);

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
                    
                   vm.leave.comments.splice(0, 0, vm.comments);
                })
                .error(function (data) {
                  console.log("error"+JSON.stringify(data));
                    $scope.notify("Oops something went wrong!! Please try again later");
                });   

                console.log('Done adding comment for leaveId:'+ leaveId);
                
                //$state.go('.', {leaveId: leaveId},  { reload: true });

            };

            

            // Triggered on a button click, or some other target            
            vm.showCancelConfirm = function() {
                var confirmPopup = $ionicPopup.confirm({
                   title: 'Cancel Leave',
                   template: 'Are you sure you want to Cancel Leave Request?'
                 });
                 confirmPopup.then(function(res) {
                    if(res) {
                      console.log('Yes, Cancel');

                      vm.statusJson = {"status" : "Cancelled"};
                      
                      Leaves.updateStatus(leaveId, vm.statusJson)
                      .success(function (data) {
                          console.log('Status Updated');

                          vm.newComment = "Leave Cancelled";
                          vm.submitComment();

                          vm.leave.status = vm.statusJson.status;
                      })
                      .error(function (data) {
                        console.log("error"+JSON.stringify(data));
                          $scope.notify("Oops something went wrong!! Please try again later");
                      });

                      //$state.go($state.current.name, {leaveId: leaveId}, {reload: true})

                      //$state.go('.', {leaveId: leaveId},  { reload: true });

                   } else {
                     console.log('No, don not Cancel');
                   }
                 });
            };

            // Triggered on a button click, or some other target            
            vm.showApproveConfirm = function() {
                var confirmPopup = $ionicPopup.confirm({
                   title: 'Approve Leave',
                   template: 'Are you sure you want to Approve Leave Request?'
                 });
                 confirmPopup.then(function(res) {
                   if(res) {
                      console.log('Yes, Approve');

                      vm.statusJson = {"status" : "Approved"};
                      
                      Leaves.updateStatus(leaveId, vm.statusJson)
                      .success(function (data) {
                          console.log('Approved');

                          vm.newComment = "Leave Approved";
                          vm.submitComment();

                          vm.leave.status = vm.statusJson.status;
                      })
                      .error(function (data) {
                        console.log("error"+JSON.stringify(data));
                          $scope.notify("Oops something went wrong!! Please try again later");
                      }); 

                      //$state.go($state.current.name, {leaveId: leaveId}, {reload: true})

                      //$state.go('.', {leaveId: leaveId},  { reload: true });

                   } else {
                     console.log('No, don not Approve');
                   }
                 });
            }; 

            // Triggered on a button click, or some other target            
            vm.showRejectConfirm = function() {
                var confirmPopup = $ionicPopup.confirm({
                   title: 'Reject Leave',
                   template: 'Are you sure you want to Reject Leave Request?'
                 });
                 confirmPopup.then(function(res) {
                    if(res) {
                      console.log('Yes, Reject');

                      vm.statusJson = {"status" : "Rejected"};
                      
                      Leaves.updateStatus(leaveId, vm.statusJson)
                      .success(function (data) {
                          console.log('Status Updated');

                          vm.newComment = "Leave Rejected";
                          vm.submitComment();

                          vm.leave.status = vm.statusJson.status;
                      })
                      .error(function (data) {
                        console.log("error"+JSON.stringify(data));
                          $scope.notify("Oops something went wrong!! Please try again later");
                      });

                      //$state.go($state.current.name, {leaveId: leaveId}, {reload: true})

                      //$state.go('.', {leaveId: leaveId},  { reload: true });

                   } else {
                     console.log('No, don not Reject');
                   }
                 });
            };   

               

        
    })

.controller('MainCtrl', function($scope, $state, $ionicModal, $ionicSideMenuDelegate) {
  /*$scope.attendees = [
    { firstname: 'Nicolas', lastname: 'Cage' },
    { firstname: 'Jean-Claude', lastname: 'Van Damme' },
    { firstname: 'Keanu', lastname: 'Reeves' },
    { firstname: 'Steven', lastname: 'Seagal' }
  ];
  */
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

  $ionicModal.fromTemplateUrl('templates/login.html', function(modal) {
      $scope.loginModal = modal;
    },
    {
      scope: $scope,
      animation: 'slide-in-up',
      focusFirstInput: true
    }
  );
  //Be sure to cleanup the modal by removing it from the DOM
  $scope.$on('$destroy', function() {
    $scope.loginModal.remove();
  });
})
  

.controller('DatepickerCtrl', function($rootScope, $scope,$ionicModal, $ionicPopup, Leaves, AuthenticationService) {
    $scope.showForm = true;
    $scope.userProfile = JSON.parse(AuthenticationService.getUserProfile()); 
    console.log("In New Leave - userProfile : "+$scope.userProfile.email);

    $ionicModal.fromTemplateUrl('templates/datemodal.html', 
        function(modal) {
            $scope.datemodal = modal;
        },
        {
        // Use our scope for the scope of the modal to keep it simple
        scope: $scope, 
        // The animation we want to use for the modal entrance
        animation: 'slide-in-up'
        }
    );
  
    $scope.opendateModal = function(dateType) {
      $scope.datemodal.show();
      if (dateType == 1) {
        $scope.dateType = 1;
      } else {
        $scope.dateType = 2;
      }
    };
  
   
    $scope.closedateModal = function(modal, dateType) {
      $scope.datemodal.hide();
      if (dateType == 2) {
        $scope.data = {
          student: $scope.data.student,      
          leaveType: $scope.data.leaveType,
          toDate: modal,
          fromDate: $scope.data.fromDate
        };
      } else {
         $scope.data = {
           student: $scope.data.student,      
           leaveType: $scope.data.leaveType,
           toDate: $scope.data.toDate,
           fromDate: modal
        };    
      }
    };
  
  
  
  /*  $scope.closeStudentPopup = function() {
    console.log('Closing popup');
    return $scope.student;
  };
  */
  $scope.data = {
    student: ''
  };
  
  /*
    $scope.chooseStudent = function() {
      $ionicPopup.show({
        templateUrl: 'studentPopup.html',
        title: 'Select Student',
        scope: $scope,
        buttons: [{
          text: 'Ok',
          type: 'button-positive',
          onTap: function() {
            //return true;          
            return $scope.closeStudentPopup()
          }
        }]
      });
    };

  */
  $scope.chooseStudent = function() {

    $scope.list = $scope.userProfile.childs;

    console.log('child list: '+JSON.stringify($scope.list));
/*
    [
      { id: $scope.userProfile.profiles.childs.student[1], name: 'Saahithi E', class: 'UKG' },
      { id: 2, name: 'Santosh E', class: 'LKG-A' }
    ];
*/
  
    // An elaborate, custom popup
    var studentPopup = $ionicPopup.show({
       templateUrl: 'studentPopup.html',
       title: 'Select Student',     
       scope: $scope     
     });

     studentPopup.then(function(res) {
       console.log('Tapped!', res);
     });
    
     $scope.closeStudentPopup = function() {
        studentPopup.close();
        console.log('Closing popup');
        return $scope.student;
     };
  };
  
  
  $scope.data = {
    leaveType: ''
  };
  
  $scope.chooseLeaveType = function() {
    
    $scope.leaveTypes = [
      {id: 1, title: 'Casual Leave'},
      {id: 2, title: 'Sick Leave'}
    ];

    var leavePopup =   $ionicPopup.show({
      templateUrl: 'leavePopup.html',
      title: 'Select Leave',
      scope: $scope
    });

    leavePopup.then(function(res) {
     console.log('Tapped!', res);
   });
    
    $scope.closeLeaveTypePopup = function() {
      leavePopup.close();
      console.log('Closing popup');
      return $scope.leaveType;
    };
  
  };
  
  $scope.autoExpand = function() {
    var element = document.getElementById("reason");
    var scrollHeight =  (element.scrollHeight > element.clientHeight) ? element.scrollHeight + 60 : 60; 
          // replace 60 by the sum of padding-top and padding-bottom
        element.style.height =  scrollHeight + "px";    
  };
    
    
  
  $scope.data = {};
  $scope.submitLeave = function() {
    if(!$scope.data.leaveType) {
      alert('Leave Type required');
      return;
    }

    if(!$scope.data.student) {
      alert('Please select a Student');
      return;
    }

    if(!$scope.data.fromDate) {
      alert('Please select from Date');
      return;
    }

    if(!$scope.data.toDate) {
      alert('Please select to Date');
      return;
    }
    
    if(!$scope.data.reason) {
      alert('Please provide reason');
      return;
    }

    // $scope.leaves.push($scope.data);

    $scope.data.status ='Pending';

    $scope.data.requestor = $rootScope.getUserName();

    $scope.data.requestedOn = new Date();

    Leaves.saveLeave($scope.data)
                .success(function (data) {
                    $scope.showForm = false; 
                    //$scope.leaves.push(data);
                })
                .error(function (data) {
                  console.log("error"+JSON.stringify(data));
                    //$scope.notify("Oops something went wrong!! Please try again later");
                });
  
  };

  
})


.controller('SignInCtrl', 
  function ($rootScope, $scope, AuthenticationService, $window, $ionicSideMenuDelegate) {
    // if the user is already logged in, take him to his bucketlist
    if ($rootScope.isSessionActive()) {
      $window.location.href = ('#/app/home');
    }
 
    $scope.user = {
        email: "",
        password: ""
    };
 
    $scope.validateUser = function () {
        var email = this.user.email;
        var password = this.user.password;
        if(!email || !password) {
            $rootScope.notify("Please enter valid credentials");
            return false;
        }
        $rootScope.show('Please wait.. Authenticating');
        AuthenticationService.signin($scope.user).success(function (data) {
           // console.log("signin done..... : "+data._id);
            $rootScope.setToken(data._id); // create a session kind of thing on the client side
           // console.log("token set .... : "+$rootScope.getToken());

            $rootScope.setUserProfile(data);

            console.log("prepForBroadcast ....");
            //sharedService.prepForBroadcast(data);
            console.log("prepForBroadcast .... Done ...");
            
            $rootScope.hide();
            $ionicSideMenuDelegate.toggleLeft();
            $window.location.href = ('#/app/home');
        }).error(function (error) {
            $rootScope.hide();
            $rootScope.notify("Invalid Username or password");
        });
    }
 
})
 
.controller('SignUpCtrl', function ($rootScope, $scope, AuthenticationService, $window) {
    $scope.user = {
        email: "",
        password: "",
        name: ""
    };
 
    $scope.createUser = function () {
        var email = this.user.email;
        var password = this.user.password;
        var uName = this.user.name;
        if(!email || !password || !uName) {
            $rootScope.notify("Please enter valid data");
            return false;
        }
        $rootScope.show('Please wait.. Registering');
        AuthenticationService.signup({
            email: email,
            password: password,
            name: uName
        }).success(function (data) {
            $rootScope.setToken(data._id); // create a session kind of thing on the client side
            $rootScope.hide();
            $window.location.href = ('#/app/home');
        }).error(function (error) {
            $rootScope.hide();
            if(error.error && error.error.code == 11000)
            {
                $rootScope.notify("A user with this email already exists");
            }
            else
            {
                $rootScope.notify("Oops something went wrong, Please try again!");
            }
            
        });
    }
})
 

/*
.controller('MapsCtrl', function($scope, $ionicLoading, $compile) {
      console.log("Maps controller start ...");
      function init() {
        console.log("Maps initialize start ...");
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
      google.maps.event.addDomListener(window, 'load', init);
      
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
      
    })

*/

.controller('MapsCtrl', function($scope) {

  var map, path = new google.maps.MVCArray(),
    service = new google.maps.DirectionsService(), poly;
  
 $scope.init = function() {
  $scope.locations = [
    { ID: 01, Name: 'Satish', Address: 'Flat# 10054', 
    Latitude: '12.99406909942627', 
    Longitude: '77.72931671142578' },
    { ID: 02, Name: 'Naveen', Address: 'Tesco', 
    Latitude: '15.12', 
    Longitude: '80.10' }
  ];

  $scope.latlng = new google.maps.LatLng($scope.locations[0].Latitude, $scope.locations[0].Longitude);
 
  $scope.mapOptions = {
        center: $scope.latlng,
        zoom: 16,
        scrollwheel: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        zoomControl: true,
        zoomControlOptions: {
          style: google.maps.ZoomControlStyle.SMALL
        }
    };

  $scope.map = new google.maps.Map(document.getElementById("map"), $scope.mapOptions);

  initialCenter = $scope.mapOptions.center;
  initialZoom = $scope.mapOptions.zoom;
  
  $scope.infoBoxContent =
'<div id="infobox">'+
  '<p class="titulo">' + $scope.locations[0].Name + '</p>'+
  '<p class="Address"> ' + $scope.locations[0].Address + '</p>'+
  '<p><a href="http://maps.google.com?ll=' + $scope.locations[0].Latitude + ',' + $scope.locations[0].Longitude + '&amp;q=' + $scope.locations[0].Address  + '" target="_blank">Open in Google Maps</a></p>'+
'</div>';

  $scope.marker = new google.maps.Marker({
    position: $scope.latlng,
    map: $scope.map,
    visible: true,
    infoBoxContent: $scope.infoBoxContent
  });
  
  $scope.infoBox = new InfoBox({
    disableAutoPan: true,
    maxWidth: 150,
    pixelOffset: new google.maps.Size(-140, 0),
    zIndex: null,
    boxStyle: {
        background: "url('http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/examples/tipbox.gif') no-repeat",
        opacity: 1,
        width: "280px"
    },
    closeBoxMargin: "18px 10px",
    closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif",
    infoBoxClearance: new google.maps.Size(1, 1)
  });
  
  google.maps.event.addListener($scope.marker, 'click', function() {
    $scope.infoBox.setContent(this.infoBoxContent);
    $scope.infoBox.open($scope.map, this);
  });

  
  // Define the symbol, using one of the predefined paths ('CIRCLE')
  // supplied by the Google Maps JavaScript API.
  var lineSymbol = {
    path: google.maps.SymbolPath.CIRCLE,
    scale: 8,
    strokeColor: '#393'
  };

  var polyOptions = {
    strokeColor: '#000000',
    strokeOpacity: 1.0,
    strokeWeight: 3,
    icons: [{
      icon: lineSymbol,
      offset: '100%'
    }]
  };
  
  poly = new google.maps.Polyline(polyOptions);
  poly.setMap($scope.map);

  $scope.addLatLng(12.99406909942627, 77.72931671142578);
  //$scope.addLatLng(12.991154, 77.727382);
  //$scope.addLatLng(12.989089, 77.727243);
 // $scope.addLatLng(12.988540, 77.729764);
  //$scope.addLatLng(12.988168, 77.731684);
  //$scope.addLatLng(12.986396, 77.731856);
  //$scope.addLatLng(12.983903, 77.728755);

  $scope.addLatLng(12.987939, 77.731802);
  //$scope.addLatLng(12.976433, 77.727275);
  $scope.addLatLng(12.974431, 77.728777); // Tesco HSC

  $scope.animateCircle();

  /*
    var pathCoordinates = [    
        new google.maps.LatLng(12.99406909942627, 77.72931671142578),
        new google.maps.LatLng(12.99406909942627, 77.73031671142578),
        new google.maps.LatLng(12.98506909942627, 77.73131671142578),
        new google.maps.LatLng(12.99606909942627, 77.73231671142578),
        new google.maps.LatLng(12.99706909942627, 77.72331671142578),
        new google.maps.LatLng(12.98006909942627, 77.73431671142578),
        new google.maps.LatLng(12.99906909942627, 77.73531671142578)        
    ];
    var pathToCenter = new google.maps.Polyline({
        path: pathCoordinates,
        geodesic: false,
        strokeColor: '#0000FF',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });
    pathToCenter.setMap($scope.map);

    new google.maps.Marker({
    position: new google.maps.LatLng(12.99606909942627, 77.73231671142578),
    map: $scope.map,
    visible: true,
    infoBoxContent: $scope.infoBoxContent
    });

    $scope.map.data.loadGeoJson('http://naveen-137287.apse1.nitrousbox.com:8100/img/route.json');
    
    $scope.map.data.setStyle({
      icon: 'http://naveen-137287.apse1.nitrousbox.com:8100/img/photo.png',
      strokeColor: 'green'
    });
  */

  
 }

 $scope.addLatLng = function(Lat, Lang) {

  
  //path = poly.getPath();
  
  // Because path is an MVCArray, we can simply append a new coordinate
  // and it will automatically appear.
  latLang = new google.maps.LatLng(Lat, Lang);

  /*
  path.push(latLang);

  // Add a new marker at the new plotted point on the polyline.
  var marker = new google.maps.Marker({
    position: latLang,
    title: '#' + path.getLength(),
    map: $scope.map
  });
  */
    if (path.getLength() === 0) {
      console.log('If : '+Lat+', '+Lang);
      path.push(latLang);
      poly.setPath(path);
    } else {
      console.log('else : '+Lat+', '+Lang);
      service.route({
        origin: path.getAt(path.getLength() - 1),
        destination: latLang,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
      }, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          for (var i = 0, len = result.routes[0].overview_path.length;
              i < len; i++) {
            path.push(result.routes[0].overview_path[i]);
          }
        }
      });
    }
}
   

// Use the DOM setInterval() function to change the offset of the symbol
// at fixed intervals.
$scope.animateCircle = function() {
    var count = 100;
    window.setInterval(function() {
      count = (count + 1) % 500;

      var icons = poly.get('icons');
      icons[0].offset = (count / 5) + '%';
      poly.set('icons', icons);
  }, 20);
}

 google.maps.event.addDomListener(window, "load", $scope.init());


})    
