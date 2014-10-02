angular.module('datepickerapp.services', [])
 
/**
 * A simple example service that returns some data.
 http://modernweb.com/2013/04/22/google-maps-markers/
 */
    .factory('Leaves', function ($http, $rootScope) {
       /* // Might use a resource here that returns a JSON array
        var APIKEY = "wdoRx9E5TffPOmIdFA9RhTz4I91mx9vnk4pJuDeybtU";
        var HEADER_VALUES = {"Authorization": "api-key " + APIKEY, "Accept": "application/json"};
        var deploymentId;
     */
      
        var getCallback = function (data, status, headers, config) {
            console.log(JSON.stringify(data, null, 2));
            return data;
        };

        /* Code for Google Maps  : Start */
        //initialize markerdata
        var markerData = [];
        markerData.push({id:1, name:"Route 1", color:"blue", position:{"lat":12.99406909942627,"long":77.72931671142578}});
        markerData.push({id:2 ,name:"Route 2", color:"green", position:{"lat":12.974431,"long":77.728777}});
        //markerData.push({id:3,name:"Truck 3", color:"red", position:{"lat":30.227925,"long":-91.996078}});
        //markerData.push({id:4,name:"Truck 4", color:"brown", position:{"lat":30.248391,"long":-91.999168}});
        //markerData.push({id:5,name:"Truck 5", color:"pink", position:{"lat":30.245425,"long":-92.020111}});


        function moveMarkers() {
	        console.log('.... inside moveMarkers ...');
          for(var i=0, len=markerData.length; i<len; i++) {
	  	    console.log('.... i ...' + i);
          console.log("Date : "+ new Date() );
            var thisMarker = markerData[i];
            //adjust both lat and long a bit, unless we don't move
            if(shouldMove()) {
              //0.002 seems like a nice amount

              thisMarker.position.lat += randRange(-0.0002,0.0002);
              thisMarker.position.long += randRange(-0.0002,0.0002);
            }
          }
	//   return markerData;
        }

        function shouldMove() {
          return Math.random() > 0.2; 
        }

        //credit: http://stackoverflow.com/a/1527820/52160
        function randRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        //exports.getMarkers = function() {
        //  moveMarkers();

        //  console.log("markerdata : "+ JSON.stringify(markerData))
          
          //return
        //  return markerData;
       // }

        /* Code for Google Maps  : End */
        
 
        return {

            getMarkers: function () {
              console.log('getMarkers .... Service');
              moveMarkers();

              var url = "http://54.68.197.84:3000";

              for(var i=0, len=markerData.length; i<len; i++) {
                var thisMarker = markerData[i];
                var trackerNo = thisMarker.id;
                $http.post(url+'/position', markerData, {
                    method: 'POST',
                    params: {
                        token: trackerNo
                    }
                });
               
              }
		          return markerData;
            },

            init: function () {
                // get the deployment id
                var id = $rootScope.getToken();
                console.log(" id : "+id);
              //var url = "http://seshu-137289.apse1.nitrousbox.com";
              var url = "http://54.68.197.84:3000";
             
              return $http.get(url+'/leaves', {
                    method: 'GET',
                    params: {
                        token: id
                    }
                });
            },
            all: function () {
                var id = $rootScope.getToken();
                var url = "http://54.68.197.84:3000";
                return $http.get(url+'/leaves', {
                    method: 'GET',
                    params: {
                        token: id
                    }
                }).success(getCallback);
            },
            saveLeave: function (data) {
                var id = $rootScope.getToken();
                var url = "http://54.68.197.84:3000";
                return $http.post(url+'/leaves', data, {
                    method: 'POST',
                    params: {
                        token: id
                    }
                });
            },
            getLeaveDetails: function (leaveId) {
              var id = $rootScope.getToken();
              var url = "http://54.68.197.84:3000" + "/leaves/" + leaveId;
                
                return $http.get(url, {
                    method: 'GET',
                    params: {
                        token: id
                    }
                }).success(getCallback);
            },
            addComment: function(leaveId, data) {
              var id = $rootScope.getToken();
              var url = "http://54.68.197.84:3000" + "/leaves/addComment/" + leaveId;

              return $http.put(url, data, {
                    method: 'PUT',
                    params: {
                        token: id
                    }
                }).success(getCallback);
            },
            updateStatus: function(leaveId, data) {
              var id = $rootScope.getToken();
              var url = "http://54.68.197.84:3000" + "/leaves/status/" + leaveId;

              return $http.put(url, data, {
                    method: 'PUT',
                    params: {
                        token: id
                    }
                }).success(getCallback);
            },
            allClasses: function () {
                var id = $rootScope.getToken();
                var url = "http://54.68.197.84:3000";
                return $http.get(url+'/classes', {
                    method: 'GET'                    
                }).success(getCallback);
            },
            saveClass: function (data) {
                console.log('saveClass.....');
                var id = $rootScope.getToken();
                var url = "http://54.68.197.84:3000";
                return $http.post(url+'/classes', data, {
                    method: 'POST'                    
                }).success(getCallback);
            }
        };
    }) 

    .factory('AuthenticationService', function ($rootScope, $http, $ionicLoading, $window) {
        var userProfile = '';

        $rootScope.show = function (text) {
            $rootScope.loading = $ionicLoading.show({
                content: text ? text : 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
        };
 
        $rootScope.hide = function () {
            $ionicLoading.hide();
        };

        $rootScope.logout = function () {
            console.log("log out .... ");
            $rootScope.setToken("");
            $window.location.href = '#/auth/signin';
        };
 
        $rootScope.notify =function(text){
            $rootScope.show(text);
            $window.setTimeout(function () {
              $rootScope.hide();
            }, 1999);
        };
 
        
 
        $rootScope.setToken = function (token) {
            return $window.localStorage.token = token;
        }
 
        $rootScope.getToken = function () {
            return $window.localStorage.token;
        }
 
        $rootScope.isSessionActive = function () {
            return $window.localStorage.token ? true : false;
        };

        $rootScope.setUserProfile = function (user) {
            $window.localStorage.username = user.name;
            $window.localStorage.email = user.email;
            console.log("UserName : "+$window.localStorage.username );
            console.log("Email : "+$window.localStorage.email );

            console.log("user profile : "+JSON.stringify(user));

            $window.localStorage.userProfile = JSON.stringify(user);           
            
        };

        $rootScope.getUserName = function () {
            return $window.localStorage.username;
        };

        $rootScope.getUserEmail = function () {
            return $window.localStorage.email;
        };

        var getCallback = function (data, status, headers, config) {
            console.log(JSON.stringify(data, null, 2));
            return data;
        };

       return {
        getUserProfile: function() {
          console.log("returning userProfile : "+$window.localStorage.userProfile);
          return $window.localStorage.userProfile;
        },       
        signin: function(user) {
          console.log("user :"+user.name);
          var url = "http://54.68.197.84:3000";
          
          console.log('In services calling post method :');
          //$http.post('https://login', { user: user }, { ignoreAuthModule: true })

          return $http.post(url+'/auth/login',user, {method: 'POST'})
            //{ ignoreAuthModule: true })
          .success(function (data, status, headers, config) {
            console.log(" User >>> : "+JSON.stringify(data));
            console.log("Token : "+data._id);
                        
            
            
           // $http.defaults.headers.common.Authorization = data._id; //data.authorizationToken;  // Step 1
            
            // Need to inform the http-auth-interceptor that
            // the user has logged in successfully.  To do this, we pass in a function that
            // will configure the request headers with the authorization token so
            // previously failed requests(aka with status == 401) will be resent with the
            // authorization token placed in the header
            /*authService.loginConfirmed(data, function(config) {  // Step 2 & 3
              config.headers.Authorization = data._id; //authorizationToken;
              return config;
            });*/
          })
          .error(function (data, status, headers, config) {
            console.log(" Error ....");
           // $rootScope.$broadcast('event:auth-login-failed', status);
          });
        },
        signup: function(user) {
          console.log("user :"+user.name);
          var url = "http://54.68.197.84:3000";
          
          console.log('In services calling post method :');
          
          return $http.post(url+'/auth/register',user, {method: 'POST'})
          .success(function (data, status, headers, config) {
            console.log(" User >>> : "+JSON.stringify(data));
            console.log("Token : "+data._id);           
          
          })
          .error(function (data, status, headers, config) {
            console.log(" Error ....");
          });
        }/*,
        logout: function(user) {
          $http.post('https://logout', {}, { ignoreAuthModule: true })
          .finally(function(data) {
            delete $http.defaults.headers.common.Authorization;
           // $rootScope.$broadcast('event:auth-logout-complete');
          });           
        },  
        loginCancelled: function() {
          authService.loginCancelled();
        }
        */
      };
    });
