var express = require('express'),
		app = express(),
		bodyParser = require('body-parser'),
		mongoose = require('mongoose');
var Book = require('./Book.model.js');
var secret = require('./private');

var port = 4444;

//Local DB
// var db = 'mongodb://localhost/crud';

var remoteDb = secret.private;
mongoose.connect(remoteDb);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Routes
app.get('/', function(req, res){
	res.send('made it to home page')
});

app.get('/books', function(req, res) {
	Book.find({})
	.exec(function(err, books) {
		if (err) {
			res.send(err)
		} else {
			console.log('books', books)
			res.json(books)
		}
	});
})

app.get('/books/:id', function(req, res) {
	Book.findOne({
		_id:req.params.id
	})
	  .exec(function(err, book){
	  	if (err) {
	  		res.send(err)
	  	} else {
	  		console.log('book', book)
	  		res.send(book)
	  	}
	  });
});

app.post('/book', function(req, res){
	var newBook = new Book();

	newBook.title = req.body.title;
	newBook.author = req.body.author;
	newBook.category = req.body.category;

	newBook.save(function(err, book) {
		if (err) {
			res.send(err)
		} else {
			console.log(book);
			res.send(book)
		}
	});
});

// Using "create" shorthand to post to the database
app.post('/book2', function(req, res) {
	Book.create(req.body, function(err, book) {
		if (err) {
			res.send(err);
		} else {
			console.log(book);
			res.send(book);
		}
	});
});

app.put('/book/:id', function(req, res) {
	Book.findOneAndUpdate({
		_id: req.params.id
	}, 
	{$set: 
		{ title: req.body.title }}, 
	  { upsert: true }, 
	  function(err, newBook) {
	  	if (err) {
	  		console.log(err);
	  	} else {
	  		console.log(newBook)
	  		res.send(newBook);
	  	}
    });
});

app.delete('/book/:id', function(req, res) {
	Book.findOneAndRemove({
		_id: req.params.id
	}, function(err, book) {
		if (err) {
			res.send(err);
		} else {
			console.log(book);
			res.status(204)
		}
	});
});

app.listen(port, function(){
	console.log('app listening on: ' + port)
});


