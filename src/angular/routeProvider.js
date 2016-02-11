
app.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when('/', { templateUrl: '/templates/home.html', controller : 'homeController' });
    $routeProvider.when('/contracts', { templateUrl: '/templates/contracts.html', controller : 'contractsController' });
    $routeProvider.when('/scripts', { templateUrl: '/templates/scripts.html', controller : 'scriptsController' });
    $routeProvider.when('/db', { templateUrl: '/templates/db.html', controller : 'dbController' });

    $routeProvider.otherwise({redirectTo: '/'});

}]).config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode(true);
}]);
