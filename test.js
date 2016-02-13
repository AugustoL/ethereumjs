var express = require('express');
var mongoose = require('mongoose');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var cors = require('cors');
var Web3 = require("web3");
var fs = require("fs");
var web3 = new Web3();
var assert = require("assert");
var request = require("request");

describe('EthereumJS Test', function() {

	var config = new require('./config');
	var logger = new require('just-a-logger')(config.logLevel, __dirname+'/logs');
	var app = express();
	var db = null;

	test('Configuration', function(done) {

		//Config Express
		app.set('port', 3000);
		app.set('views', __dirname + '/views');
		app.engine('html', require('ejs').renderFile);
		app.set('view engine', 'html');
		app.use(favicon(__dirname + '/dist/res/eth.ico')); 
		app.use('/dist', express.static(__dirname + '/dist'));
		app.use(bodyParser.json({ limit: '50mb' }));
		app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
		app.use(cors());

		//Connect
		logger.log(config.dbURI);
		mongoose.connect(config.dbURI);
		db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error:'));

		//Once connected do actions
		db.once('open', function callback () {
		    logger.important('Connected to DB: '+config.dbURI);
		    require('./schemas/contracts')(db);
		    done();
		});

	});

	test('Start web3 provider', function(done) {
		
		web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
		console.log("Web3 "+web3.version.api+" started");
		done();

	});

	test('Start server', function(done) {
		
		require('./routes/routes')(logger, app, db, web3).addRoutes();
		app.all('/internalError', function(req, res) { res.render('error500.html') });

		var server = app.listen(app.get('port'), function() {
		    logger.important('Ethereum app started at port '+app.get('port'));
		    done();
		});		

	});

	test('Execute script: checkBalances', function(done) {
		
		request.post({ url:'http://localhost:3000/runScript?name=checkBalances.js' }, function(err, httpResponse, body){ 
			assert.equal(true, JSON.parse(body).success);
			done();
		});	

	});

	test('Execute script: greet and destroy', function(done) {
		
		request.post({ url:'http://localhost:3000/runScript?name=greet and destroy.js' }, function(err, httpResponse, body){ 
			assert.equal(true, JSON.parse(body).success);
			done();
		});	

	});

	var contractAddress = "";

	test('Execute script: greet and live && find and greet', function(done) {
		
		request.post({ url:'http://localhost:3000/runScript?name=greet and live.js' }, function(err, httpResponse, body){ 
			contractAddress = JSON.parse(body).address;
			assert.equal(true, JSON.parse(body).success);
			done();
		});

	});
	
	test('Execute script: find and greet', function(done) {
		request.post({url:'http://localhost:3000/runScript?name=find and greet.js&address='+contractAddress}, function(err, httpResponse, body){ 
			assert.equal(true, JSON.parse(body).success);
			done();
		});
	});
	
	test('Destroy living greeting contract', function(done) {

		request.post({url:'http://localhost:3000/destroyContract?address='+contractAddress}, function(err, httpResponse, body){ 
			assert.equal(true, JSON.parse(body).success);
			done();
		});

	});
	
});
