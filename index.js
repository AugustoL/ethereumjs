//Dependencies
var express = require('express');
var mongoose = require('mongoose');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var async = require('async');
var cors = require('cors');
var grunt = require('grunt');
var Web3 = require("web3");
var fs = require("fs");
var web3 = new Web3();

//Configuration
var config = new require('./config');

//Logger
var logger = new require('just-a-logger')(config.logLevel, __dirname+'/logs');

//Get arguments
var args = process.argv.slice(2);

//Launch express
var app = express();
process.env.PORT = 3000;

var script_name = "";
var contract_name = "";
var db = null;

//Connect
logger.log(config.dbURI);
mongoose.connect(config.dbURI);
db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//Once connected do actions
db.once('open', function callback () {
    logger.important('Connected to DB: '+config.dbURI); 
});
require('./schemas/contracts')(db);

web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
console.log("Web3 "+web3.version.api+" started");

//Config Express
app.set('port', 3000);
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(favicon(__dirname + '/dist/res/eth.ico')); 
app.use('/dist', express.static(__dirname + '/dist'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors());

//Add routes
require('./routes/routes')(logger, app, db, web3).addRoutes();

app.all('/internalError', function(req,res) { res.render('error500.html') });

//Start the server
var server = app.listen(app.get('port'), function() {
    logger.important('Ethereum app started at port '+app.get('port'));
});

if (args.indexOf('-dev') < 0){
	grunt.tasks(['clean']);
	grunt.tasks(['ngAnnotate']);
	grunt.tasks(['uglify']);
	grunt.tasks(['cssmin']);
	grunt.tasks(['watch:js','watch:css']);
} else {
	grunt.tasks(['clean']);
	grunt.tasks(['copy']);
	grunt.tasks(['chmod']);
	grunt.tasks(['watch:dev']);
}

process.on('SIGINT', function() {
    process.exit();
});
