'use strict';

/**
 * @ngdoc function
 * @name iconRockstarApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the iconRockstarApp
 */
angular.module('iconRockstarApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.randomGradient = function () {
      var grad = _.sample($scope.gradientsList);
      $scope.gradientStart = grad.colour1;
      $scope.gradientStop = grad.colour2; 
      $scope.$apply();
    };

    $http.get('data/gradients.json')
      .success(function (data) {
        $scope.gradientsList = data;
        $scope.randomGradient();
      }).error(function (data) {

      });
  });
