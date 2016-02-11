var fs = require('fs');
var async = require('async');

module.exports = function(web3,db) {
	var _greeting = "THANKS !, now im going to live forever and ever happy on the blockchain :D ";

	fs.readFile(__dirname+'/../contracts/greeting.sol', function (err, data) {
        if (err)
            throw err;
        
        var contractSource = data.toString('utf-8');  
	    var contractCompiled = web3.eth.compile.solidity(contractSource);

		web3.eth.contract(contractCompiled.greeter.info.abiDefinition).new(_greeting, { from : web3.eth.accounts[0], data : contractCompiled.greeter.code, gas : 300000 }, function(err, contract){
		    if(!err) {

		    	// NOTE: The callback will fire twice!
		        // Once the contract has the transactionHash property set and once its deployed on an address.

		        // First callback with the txHash
				if(!contract.address) {
					console.log("Contract transaction send: TransactionHash: " + contract.transactionHash + " waiting to be mined...");
					db.newContract('greeting', contractSource, contractCompiled.greeter.info.abiDefinition, contract.transactionHash);

				// Second callback with address, contract deployed ;)
				} else {
					console.log("Contract mined! Address: " + contract.address);
					async.waterfall([
						//Find Contract on DB
			            function(callback) {
			                 db.findByTx(contract.transactionHash, function(err, contractOnDB){
								if (err)
									callback(err);
								callback(null, contractOnDB)
							});
			            },
			            //Save it as mined on DB
			            function(contractOnDB, callback) {
							contractOnDB.mined(contract.address, function(err){
								if (err)
									callback(err);
								callback(null);
							});
			            }
			        ], function (err) {
			            if (err){
			                console.error(err.toString());
			                throw err;
			            }
			            console.log(contract.greet());
			        });	
				}
		    } else {
		    	console.error(err.toString());
			    throw err;
		    }
		});
	});
};