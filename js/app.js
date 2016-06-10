var euroApp = angular.module('euroApp', ['ngRoute','themeController']);
var themeController = angular.module('themeController', []);

//public var
var API_URL = "http://api.varzesh3.com/v0.2/leaguestat/widget/5/";
var MATCH_EVENT_URL = "http://api.varzesh3.com/v0.2/match/events/";

//get default group
var A_URL = "13";

//app config
euroApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $location) {
  $location.hashPrefix('!');
  $routeProvider.
  when('/euro', {
      templateUrl: 'view/home.html',
      controller: 'HomeCtrl'

    }).when('/group/:param/schedule', { 
      templateUrl: 'view/group.html',
      controller: 'GroupCtrl'
   
    }).when('/match/:param/group/:pageParam', { 
      templateUrl: 'view/match.html',
      controller: 'MatchCtrl'
   
    }).otherwise({
      redirectTo: '/euro'
    });
  //app config
}]);

//convert to persian numbers - filter | required persian.js
euroApp.filter('persianNumbers', function() {
  return function(str) {
    if ((str != null) && str.toString().trim() !== "") {
      return persianJs(str.toString()).englishNumber().toString();
    } else {
      return "";
    }
};
});

//status type - filter
euroApp.filter('status', function() {
  var result;
  return function(input) {
    if (input == 1) {
      result = "goal.png";
    }
    if(input == 2){
      result = "yc.png";
    }
    if(input == 3){
      result = "rc.png";
    }
    if(input == 4){
      result = "2yc.png";
    }
    if(input == 5){
      result = "missed-penalty.png";
    }
    if(input == 6){
      result = "pg.png";
    }
    if(input == 7){
      result = "og.png";
    }
    return result;

//function
  };
});

  //Home controller
  themeController.controller('HomeCtrl', ['$scope', '$http', function($scope, $http){
  //show loading
  $scope.loading = true;

  //get data with $http service
  $http.get(API_URL + A_URL).success(function(data){
  $scope.groups = data;

  //get data complete - hide loading
  $scope.loading = false;

 //http
  });

//function for get table
$scope.getVal = function(btnValue){
  $scope.loading = true;
  var saveValue = btnValue;
  $http.get(API_URL + btnValue).success(function(data){
  $scope.groups = data;
  $scope.loading = false;

//http
});
 
//function
}

//Home ctrl
}]);


//Group controller
themeController.controller('GroupCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams){
  $scope.loading = true;
  var GROUP_ID = $routeParams.param;
  $http.get(API_URL + GROUP_ID).success(function(data){

  $scope.group = data;

  //paging
  $scope.limit = 0;
  $scope.nextBtn = true;
  $scope.prevBtn = false;

  $scope.loading = false;

  //next page
  $scope.nextPage = function(){
    $scope.limit = 3;
    $scope.nextBtn = false;
    $scope.prevBtn = true;
  }

  //prev page
  $scope.prevPage = function(){
    $scope.limit = 0;
    $scope.prevBtn = false;
    $scope.nextBtn = true;
  }

  //http
  });
  //ctrl
}]);

//Match controller
themeController.controller('MatchCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams){
  $scope.loading = true;
  var MATCH_ID = $routeParams.param;

  //get prev page url for back button
  $scope.prevPage = $routeParams.pageParam;

  $http.get(MATCH_EVENT_URL + MATCH_ID).success(function(data){
    $scope.match = data;
    $scope.loading = false;

  //http
  });

  //ctrl
}]);