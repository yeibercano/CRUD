var express = require('express'),
		app = express(),
		bodyParser = require('body-parser'),
		mongoose = require('mongoose');
var Book = require('./Book.model.js');
var port = 4444;
var db = 'mongodb://localhost/crud';

mongoose.connect(db);

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
	  		res.json(book)
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

app.listen(port, function(){
	console.log('app listening on: ' + port)
});


