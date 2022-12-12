var mongoose     = require('mongoose');
var Schema = mongoose.Schema;

var GenreSchema   = new Schema({
	genre_id: Number,
	tracks: Number,
	parent: Number,
	title: String,
	top_level: Number
});

module.exports = mongoose.model('Genre', GenreSchema);
