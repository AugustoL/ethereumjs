angular.module('ethJS.controllers').controller('dbController', ['$scope','appService', function($scope,appService){
    console.log("dbController init");
    $scope.contracts = [];
    $scope.loading = true;

    appService.getContracts().then(function(promise){
    	$scope.contracts = promise.data.contracts;
    	console.log($scope.contracts);
    	$scope.loading = false;
    });

    $scope.destroyContract = function(address){
    	$scope.loading = true;
    	appService.destroyContract(address).then(function(promise){
	    	appService.getContracts().then(function(promise){
		    	$scope.contracts = promise.data.contracts;
		    	console.log($scope.contracts);
		    	$scope.loading = false;
		    });
	    });
    };

    $scope.openContract = function(contract){
        contract.loading = true;
        appService.getContract(contract.address).then(function(promise){
            console.log(promise.data);
            contract.code = promise.data.code;
            contract.loading = false;
        });
    };

    $scope.closeContract = function(contract){
        contract.code = false;;
    };

}]);