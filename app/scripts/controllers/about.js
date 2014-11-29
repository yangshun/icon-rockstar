'use strict';

/**
 * @ngdoc function
 * @name iconRockstarApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the iconRockstarApp
 */
angular.module('iconRockstarApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
