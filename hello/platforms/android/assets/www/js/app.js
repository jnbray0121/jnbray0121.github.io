// Declare app level module which depends on filters, and services
var tabApp=angular.module('plunker', [
    'ngRoute'
]).config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.when('/tabs/tab1', {
      templateUrl: 'tabs/tab1.html',
      controller: 'MainCtrl'
    })
      .when('/tabs/tab2', {
        templateUrl: 'tabs/tab2.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/tabs/tab1'
      });
      
      $locationProvider.html5Mode(true);
  }
]);

tabApp.controller('NavCtrl', function($scope, $location) {
  $scope.isActive = function(route) {
    $scope.path = $location.path();
    return $location.path() === route;
  };
});

tabApp.controller('MainCtrl', function($scope) {
  $scope.range = function(a, b) {
    var coll = [];
    for (var i = a; i <= b; i++) {
      coll.push(i);
    }
    return coll;
  }  
});

tabApp.factory('rememberService', function() {
  return {
    scrollTop: undefined
  };
});

tabApp.directive('scroller', function($timeout, rememberService) {
  return {
    restrict: 'A',
    scope: {},
    link: function(scope, elm, attrs) {
      var raw = elm[0];
      elm.bind('scroll', function() {
        rememberService.scrollTop = raw.scrollTop;
      });
      $timeout(function() {
        raw.scrollTop = rememberService.scrollTop;
      });
    }
  };
});