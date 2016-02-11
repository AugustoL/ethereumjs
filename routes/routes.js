var fs = require('fs');
var async = require('async');

module.exports = function(logger,app,db,web3){

    var module = {};

    module.addRoutes = function(){
        //Index, templates and directives
        app.get('/', module.renderIndex);
        app.get('/contracts', module.renderIndex);
        app.get('/scripts', module.renderIndex);
        app.get('/db', module.renderIndex);
        app.get('/templates/:name',module.templates);
        app.get('/directives/:name',module.directives);

        app.get('/getContractsSrc',module.getContractsSrc);
        app.get('/getContracts',module.getContracts);
        app.get('/getScripts',module.getScripts);
        app.get('/getWeb3',module.getWeb3);
        app.get('/getContract',module.getContract);

        app.post('/runScript', module.runScript);
        app.post('/destroyContract', module.destroyContract);

    }

    module.renderIndex = function(req,res){
        res.render('index.html');
    };

    module.templates = function(req,res){
        res.render('templates/' + req.params.name);
    };

    module.directives = function(req,res){
        res.render('directives/' + req.params.name);
    };

    module.getContractsSrc = function(req,res){
        fs.readdir(__dirname+'/../contracts/', function (err, files) {
            var contractsSrc = [];
            if (files.length > 0){
                async.forEachOf(files, function (value, key, callback) {
                    fs.readFile(__dirname+'/../contracts/'+value, "utf8", function (err, data) {
                        if (err) 
                            callback(err);
                        try {
                            contractsSrc.push({
                                name : value,
                                code : data.toString('utf-8')
                            });
                            callback();
                        } catch (e) {
                            return callback(e);
                        }
                    });
                }, function (err) {
                    if (err)
                        logger.error(err.message);
                    res.json({ contractsSrc :  contractsSrc });
                })
            } else {
                res.json({ contractsSrc :  [] });
            }
        })
    };

    module.getScripts = function(req,res){
        fs.readdir(__dirname+'/../scripts/', function (err, files) {
            var scripts = [];
            if (files.length > 0){
                async.forEachOf(files, function (value, key, callback) {
                    fs.readFile(__dirname+'/../scripts/'+value, "utf8", function (err, data) {
                        if (err) 
                            callback(err);
                        try {
                            scripts.push({
                                name : value,
                                code : data.toString('utf-8')
                            });
                            callback();
                        } catch (e) {
                            return callback(e);
                        }
                    });
                }, function (err) {
                    if (err)
                        logger.error(err.message);
                    res.json({ scripts :  scripts });
                })
            } else {
                res.json({ scripts :  [] });
            }
        })
    };

    module.getWeb3 = function(req,res){
        res.json({ "version" : web3.version, "provider" : web3.currentProvider });
    };

    module.runScript = function(req,res){
        try {
            console.log("Running script "+req.query.name+"..");
            fs.readFile(__dirname+'/../scripts/'+req.query.name, function (err, data) {
                if (err)
                    throw err;
                var source = data.toString('utf-8');
                require(__dirname+'/../scripts/'+req.query.name)(web3,db);
                res.json({ success : true, code : source });
            });
        } catch(e){
            res.json({ success : false, error : e.toString() });
        }  
    };

    module.getContracts = function(req,res){
        db.contracts.find().sort('-dateCompiled').exec(function(err, contracts){
            if (err)
                res.json({success : false, message : err.toString()});
            else if (contracts)
                res.json({success : true, contracts : contracts});
            else
                res.json({success : true, contracts : []});
        });
    };

    module.getContract = function(req,res){
        db.findByAddress(req.query.address,function(err,contract){
            if (err)
                res.json({success : false, message : err.toString()});
            else if (contract){
                res.json({ success : true, code : web3.eth.contract(contract.ABI).at(contract.address) });
            } else
                res.json({success : true, code : ""});
        })  
    };

    module.destroyContract = function(req,res){
        db.findByAddress(req.query.address,function(err,contract){
            if (err)
                res.json({success : false, message : err.toString()});
            else if (contract){
                web3.eth.contract(contract.ABI).at(contract.address).destroy.sendTransaction({ from : web3.eth.accounts[0] }, function(err, address){
                    if (err)
                        res.json({success : false, message : err.toString()})
                    contract.destroy(function(err){
                        if (err)
                            res.json({success : false, message : err.toString()});
                        console.log("Contract on "+contract.address+" address destroyed.");
                        res.json({success : true});
                    });
                });
            } else
                res.json({success : false, message : "There is no contract with the address "+req.query.address+" on DB."});
        })
    };


    return module;

}