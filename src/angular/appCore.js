var app = angular.module('ethJS', ['ethJS.controllers', 'ethJS.directives', 'ethJS.services', 'ngRoute', 'LocalStorageModule']);

//Controllers mudule
angular.module('ethJS.controllers', []);
//Services Module
angular.module('ethJS.services', ['LocalStorageModule']);
//Directives Module
angular.module('ethJS.directives', []);

//LocalStorage Configuraton
app.config(["localStorageServiceProvider", function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('ethjs')
    .setStorageType('localStorage')
    .setNotify(true, true)
}]);

app.filter('to_trusted', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}]);