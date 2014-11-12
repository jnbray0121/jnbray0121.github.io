// Declare app level module which depends on filters, and services
var app=angular.module('plunker', [
    'ngRoute'
]).config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.when('/tab1', {
      templateUrl: 'tab1.html',
      controller: 'MainCtrl'
    })
      .when('/tab2', {
        templateUrl: 'tab2.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/tab1'
      });
      
      $locationProvider.html5Mode(true);
  }
]);

app.controller('NavCtrl', function($scope, $location) {
  $scope.isActive = function(route) {
    $scope.path = $location.path();
    return $location.path() === route;
  };
});

app.controller('MainCtrl', function($scope) {
  $scope.range = function(a, b) {
    var coll = [];
    for (var i = a; i <= b; i++) {
      coll.push(i);
    }
    return coll;
  }  
});

app.factory('rememberService', function() {
  return {
    scrollTop: undefined
  };
});

app.directive('scroller', function($timeout, rememberService) {
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