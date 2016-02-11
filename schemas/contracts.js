var mongoose = require("mongoose");

module.exports = function(db) {
	
	var contract = new mongoose.Schema({
		name : { type: String, default: ""},
		source : { type: String, default: ""},
		ABI : { type: [mongoose.Schema.Types.Mixed], default: []},
		tx : { type: String, default: ""},
		address : { type: String, default: ""},
		dateCompiled : { type: Date, default: null},
		dateDestroyed : { type: Date, default: null}
	});

	contract.methods.fill = function(name, source, ABI, tx, callback){
		this.name = name;
		this.source = source;
		this.ABI = ABI;
		this.tx = tx;
		this.dateCompiled = new Date();
		this.save(function(err){
			if (err)
				if (callback)
					callback(err);
				else
					throw err;
			else if (callback)
				callback(null, this);
		});
	};

	contract.methods.mined = function(address, callback){
		this.address = address;
		this.save(function(err){
			if (err)
				if (callback)
					callback(err);
				else
					throw err;
			else if (callback)
				callback(null, this);
		});
	};

	contract.methods.destroy = function(callback){
		this.dateDestroyed = new Date();
		this.save(function(err){
			if (err)
				if (callback)
					callback(err);
				else
					throw err;
			else if (callback)
				callback(null, this);
		});
	};

	db.contracts = db.model('contracts', contract);

	db.findByTx = function(tx, callback){
		db.contracts.findOne({tx : tx}).exec(function(err, contract){
            if (err)
                callback(err);
            else if (contract)
                callback(null, contract);
        })  
	};

	db.findByAddress = function(address, callback){
		db.contracts.findOne({address : address}).exec(function(err, contract){
            if (err)
                callback(err);
            else if (contract)
                callback(null, contract);
        })  
	};

	db.newContract = function(name, source, ABI, tx, callback){
		var newContract = new db.contracts();
		newContract.fill(name, source, ABI, tx);
		newContract.save(function(err){
			if (err)
				if (callback)
					callback(err);
				else
					throw err;
			else if (callback)
				callback(null,newContract);
		});
	};

};
