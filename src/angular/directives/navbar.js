angular.module('ethJS.directives').directive('navbar', function () {
    return {
        restrict: 'E',
        templateUrl: '/directives/navbar.html',
        controller: 'navBarController'
    };
});