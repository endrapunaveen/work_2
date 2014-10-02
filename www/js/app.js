// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'asianbattery' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'asianbattery.controllers' is found in controllers.js
angular.module('datepickerapp', ['ionic','datepickerapp.controllers', 'datepickerapp.services'])

    .run(function ($rootScope, $ionicPopup, $state, $ionicPlatform, $window, Leaves) {

       
        $ionicPlatform.ready(function () {
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });

       /* $rootScope.$on('$stateChangeStart', function(event, toState) {
            if (toState.name !== "auth.signin" && toState.name !== "auth.signup"
              /* && !$window.sessionStorage['fbtoken'] */
       /*       ) {
                $state.go('app.signin');
                event.preventDefault();
            }
        });
*/

        
    })


  .filter('duration', function(){
    return function(value1, value2) {

        var diff = new Date(value2) - new Date(value1);

        // ms units
        var second = 1000;
        var minute = second * 60;
        var hour = minute * 60;
        var day = hour * 24;
        var year =  day * 365;
        var month = day * 30;

        var unit = day;
        var unitStr = 'day';
        if(diff < year) {         
          unit = day;
          unitStr = 'day';
        }

        var amt = Math.ceil(diff / unit) + 1;

        if(amt > 1) {
          unitStr = 'days';
        }
        
        return amt + ' ' + unitStr;
    }
  })

 // A simple relative timestamp filter
    .filter('relativets', function() {
      
      return function(value) {
    
        var now = new Date();
        var requestDate = new Date(value);
        var diff = now - requestDate;

        // ms units
        var second = 1000;
        var minute = second * 60;
        var hour = minute * 60;
        var day = hour * 24;
        var year =  day * 365;
        var month = day * 30;

        var unit = day;
        var unitStr = 'd';
        if(diff > year) {
          unit = year;
          unitStr = 'y';
        } else if(diff > day) {
          unit = day;
          unitStr = 'd';
        } else if(diff > hour) {
          unit = hour;
          unitStr = 'h';
        } else if(diff > minute) {
          unit = minute;
          unitStr = 'm';
        } else {
          unit = second;
          unitStr = 's';
        }

        var amt = Math.ceil(diff / unit);
        //   console.log("value : "+requestDate);
        //console.log("now : "+now);
        //console.log("unitStr :"+ unitStr);

        //console.log("amt :"+amt);
        return amt + '' + unitStr;
      }
    })


.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
      .state('auth', {
          url: "/auth",
          abstract: true,
          templateUrl: "templates/auth.html"
      })
      .state('auth.signin', {
          url: '/signin',
          views: {
              'auth-signin': {
                  templateUrl: 'templates/auth-signin.html',
                  controller: 'SignInCtrl'
              }
          }
      })
      .state('auth.signup', {
          url: '/signup',
          views: {
              'auth-signup': {
                  templateUrl: 'templates/auth-signup.html',
                  controller: 'SignUpCtrl'
              }
          }
      })
    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'MainCtrl'
    })
    .state('app.leaves', {
      url: "/leaves",
      views: {
        'menuContent' :{
          templateUrl: "templates/leaves.html"
         // controller: 'LeavesCtrl'
        }
      }
    })  
    .state('app.leave', {
        url: "/leave/:leaveId",
        views: {
            'menuContent': {
                templateUrl: "templates/leaveDetails.html",
                controller: "LeaveDetailCtrl"
            }
        }
    })
    .state('app.datepicker', {
      url: "/datepicker",
      views: {
        'menuContent' :{
          templateUrl: "templates/datepicker.html",
          controller: 'DatepickerCtrl'
        }
      }
    }) 
    .state('app.classes', {
      url: "/classes",
      views: {
        'menuContent' :{
          templateUrl: "templates/classes.html"
          // controller: 'ClassesCtrl'
        }
      }
    })
    .state('app.newclass', {
      url: "/newclass",
      views: {
        'menuContent' :{
          templateUrl: "templates/newClass.html"
        }
      }
    })
    .state('app.students', {
      url: "/students",
      views: {
        'menuContent' :{
          templateUrl: "templates/students.html"
          // controller: 'StudentsCtrl'
        }
      }
    })
    .state('app.maps', {
      url: "/maps",
      views: {
        'menuContent' :{
          templateUrl: "templates/maps.html",
          controller: 'MapsCtrl'
        }
      }
    })
    .state('app.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "templates/home.html",
          controller: 'MainCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/auth/signin');
  //$urlRouterProvider.otherwise('/app/home');
});