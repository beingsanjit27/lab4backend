var mongoose     = require('mongoose');
var Schema = mongoose.Schema;

var ListSchema   = new Schema({
	list_name: String,
	tracks: [Number],
});

module.exports = mongoose.model('list', ListSchema);
