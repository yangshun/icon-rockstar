'use strict';

/**
 * @ngdoc function
 * @name iconRockstarApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the iconRockstarApp
 */
angular.module('iconRockstarApp')
  .controller('SearchCtrl', function ($scope, $http) {
    $scope.fontSize = 32;
    $http.get('data/icons.json')
      .success(function (data) {
        $scope.icons = data;
      }).error(function (data) {

      });
  });
