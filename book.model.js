var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

var BookSchema = new Schema({

	title: String,
	author: String,
	category: String
});

module.exports = mongoose.model('Book', BookSchema);