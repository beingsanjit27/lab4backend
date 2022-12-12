var mongoose     = require('mongoose');
var Schema = mongoose.Schema;

var GenreSchema   = new Schema({
	account_id: Number,
	account_username: String,
	account_email: String,
    account_password: String,
    
});

module.exports = mongoose.model('account', AccountSchema);