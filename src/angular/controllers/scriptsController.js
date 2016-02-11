angular.module('ethJS.controllers').controller('scriptsController', ['$scope', 'appService', function($scope, appService){
    console.log("scriptsController init");
    $scope.loading = true;
    $scope.scripts = [];

    appService.getScripts().then(function(promise){
    	$scope.scripts = promise.data.scripts;
    	$scope.loading = false;
    });

    $scope.runScript = function(scriptName){
        appService.runScript(scriptName).then(function(promise){
            if (promise.data.success){
                $('#successAlert').show();
                appService.addEvent({
                	success : promise.data.success,
                	name : scriptName,
                	code : promise.data.code,
                	result : "Success",
                	type : 'script',
                	date : new Date()
                });
            } else {
                $('#errorAlert').show();
                appService.addEvent({
                	success : promise.data.success,
                	name : scriptName,
                	code : promise.data.code,
                	result : "Error: "+pomise.data.error,
                	type : 'script',
                	date : new Date()
                });
            }
        });
    }
}]);