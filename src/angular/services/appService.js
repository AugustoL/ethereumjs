
angular.module('ethJS.services').factory('appService', ['$http', 'localStorageService', function ($http, localStorageService) {

    var factory = {};

    //Storage
    factory.addItem = function(key, value){
        return localStorageService.set(key, value);
    }
    factory.getItem = function(key){
        return localStorageService.get(key);
    }
    factory.removeItem = function(key){
        localStorageService.remove(key);
    }
    factory.cleanHistory = function(){
        localStorageService.clearAll();
    }

    //History of events
    factory.history = factory.getItem("history") || [];

    factory.addEvent = function(event){
        factory.history.push(event);
        factory.addItem("history", factory.history);
    }

    //Actions
    factory.getContractsSrc = function () {
        var promise = $http({
            method: 'GET',
            url: '/getContractsSrc'
        });
        return promise;
    }

    factory.getScripts = function () {
        var promise = $http({
            method: 'GET',
            url: '/getScripts'
        });
        return promise;
    }

    factory.getWeb3 = function () {
        var promise = $http({
            method: 'GET',
            url: '/getWeb3'
        });
        return promise;
    }

    factory.getContracts = function () {
        var promise = $http({
            method: 'GET',
            url: '/getContracts'
        });
        return promise;
    }

    factory.getABIContract = function (address) {
        var promise = $http({
            method: 'GET',
            params: {address : address},
            url: '/getABIContract'
        });
        return promise;
    }

    factory.destroyContract = function (address) {
        var promise = $http({
            method: 'POST',
            params: {address : address},
            url: '/destroyContract'
        });
        return promise;
    }

    factory.getContract = function (address) {
        var promise = $http({
            method: 'GET',
            params: {address : address},
            url: '/getContract'
        });
        return promise;
    }

    factory.runScript = function(name){
        var promise = $http({
            method: 'POST',
            url: '/runScript',
            params: { name : name }
        });
        return promise;
    }

    return factory;
}]);