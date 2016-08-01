var express = require('express'),
		app = express(),
		bodyParser = require('body-parser'),
		mongoose = require('mongoose');
var Book = require('./Book.model.js');

var db = 'mongodb://localhost/crud';
mongoose.connect(db);

var port = 4444;

app.listen(port, function(){
	console.log('app listening on: ' + port)
});