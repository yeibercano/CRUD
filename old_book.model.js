'use strict';

var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

var BookSchema = new Schema({

	title: String,
	published: {
		type: Date,
		default: Date.now
	},
	keywords: Array,
	published: Boolean,
	authos:{
		type: Schema.Objectid,
		ref: 'User'
	},
	//Embedded sub-document
	detail: {
		modelNumber: Number,
		hardcover: Boolean,
		reviews: Number,
		rank: Number
	}
});

module.exports = mongoose.model('Book', BookSchema);