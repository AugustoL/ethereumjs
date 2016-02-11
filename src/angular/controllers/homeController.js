angular.module('ethJS.controllers').controller('homeController', ['$scope', 'appService', function($scope, appService){
    console.log("homeController init");
    $scope.appEvents = appService.history;
    $scope.web3Info = {};
    $scope.loading = true;
    appService.getWeb3().then(function(promise){
    	$scope.web3Info = promise.data;
    	$scope.loading = false;
    	console.log($scope.web3Info);
    })
    console.log($scope.appEvents);

    $scope.cleanHistory = function(){
        appService.cleanHistory();
        $scope.appEvents = []; 
    }
}]);