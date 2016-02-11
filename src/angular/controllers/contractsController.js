angular.module('ethJS.controllers').controller('contractsController', ['$scope', 'appService', '$location', function($scope, appService, $location){
    console.log("contractsController init");
    $scope.loading = true;
    $scope.contractsSrc = [];

    appService.getContractsSrc().then(function(promise){
    	$scope.contractsSrc = promise.data.contractsSrc;
    	$scope.loading = false;
    });

}]);