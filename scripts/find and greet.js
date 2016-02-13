var fs = require('fs');
var async = require('async');

module.exports = function(web3, db, finalCallback) {

	//The address of teh greeting contract that its living on the blockchain
	var address = '0xe202a6aed4575ed90a3abfb735bdb6e57f7b4461';

	db.contracts.findOne({ 'address' : address }).exec(function(err, contract){
        if (err)
            finalCallback(err);
        else if (contract){
            console.log(web3.eth.contract(contract.ABI).at(contract.address).greet());
            finalCallback(null);
        } else {
            console.log("There is no contract with the address "+address+" greeting on DB.");
            finalCallback("There is no contract with the address "+address+" greeting on DB.");
        }
    })
};