var mongoose     = require('mongoose');
var Schema = mongoose.Schema;

var ArtistSchema   = new Schema({
	artist_id: Number,
	artist_name: String,
    artist_bio:String,
    artist_handle:String,
    artist_location:String,
    artist_favorites:Number,
    artist_website:String
	
});

module.exports = mongoose.model('artist', ArtistSchema
    );