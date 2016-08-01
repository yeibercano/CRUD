var express = require('express'),
		app = express(),
		bodyParser = require('body-parser'),
		mongoose = require('mongoose');
var Book = require('./Book.model.js');
var port = 4444;
var db = 'mongodb://localhost/crud';

mongoose.connect(db);

// routes
app.get('/', function(req, res){
	res.send('made it to home page')
});

app.listen(port, function(){
	console.log('app listening on: ' + port)
});