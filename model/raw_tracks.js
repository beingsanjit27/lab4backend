var mongoose     = require('mongoose');
var Schema = mongoose.Schema;

var TrackSchema   = new Schema({
	track_id: Number,
	album_id: Number,
    album_title: String,
    artist_id:Number,
    artist_name: String, 
    tags:[String], 
    track_date_created:Date, 
    track_date_recorded:Date, 
    track_duration:String, 
    track_genres:Object, 
    track_number:Number, 
    track_title:String,
    track_interest:Number,
    track_listens:Number,
    license_title:String
	
});

TrackSchema.index({"$**":"text"});
module.exports = mongoose.model('track', TrackSchema);