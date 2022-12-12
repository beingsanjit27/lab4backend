const mongoose = require("mongoose");


const Track = require("../model/raw_tracks");

const getAllTracks = async (req, res) => {
    try {
        const track = await Track.find();
        const response = {
            count: track.length,
            track: track.map(track => {
                return {

                    _id: track._id,
                    track_id: track.track_id,
                    album_id: track.album_id,
                    track_id: track.track_id,
                    track_name: track.track_name,
                    tags: track.tags,
                    track_date_created: track.track_date_created,
                    track_date_recorded: track.track_date_recorded,
                    track_duration: track.track_duration,
                    track_genres: track.track_genres,
                    track_number: track.track_number,
                    track_title: track.track_title,
                    
                    request: {
                        type: 'GET',
                        url: 'http://localhost:8080/api/tracks/'
                    }

                }
            })

        }
        res.status(200).json({ response })
    } catch (error) {
        console.log(error)
    }
}



const getTrack = async (req, res) => {
    console.log("request params, abc ", req.param);
    console.log("request query ", req.query);
    const user = req.param.id;
    const titleName = req.query.track_title;
    const searchString = titleName?.charAt(0).toUpperCase() + titleName?.slice(1);

    const albumTitle = req.query.album_title;
    const artistName = req.query.artist_name;
    const genreName = req.query.track_genres;
    //assume we get only "Jazz" instead of whole arr of obj

    const trackId = req.query.id;
    const limit = req.query.n;
    console.log('limit ', limit)
    try {
        //const track = await Track.findOne({track_id:req.params.id});
        const track = await Track.find({ $or: [{ track_title: searchString }, { track_id: trackId },
            { artist_name: artistName }, { album_title: albumTitle }, { track_genres: genreName }] }).limit(limit);
        console.log('length og tracks ', track.length)
        console.log('tracks from db ', track)
        let data = []
        track.map(track => {
            const response = {
                _id: track._id,
                track_id: track.track_id,
                album_id: track.album_id,
                track_id: track.track_id,
                track_name: track.track_name,
                tags: track.tags,
                track_date_created: track.track_date_created,
                track_date_recorded: track.track_date_recorded,
                track_duration: track.track_duration,
                track_genres: track.track_genres,
                track_number: track.track_number,
                track_title: track.track_title,
                artist_name: track.artist_name,
                album_title: track.album_title,
                track_interest:track.track_interest,
                track_listens:track.track_listens,
                license_title:track.license_title,
                request: {
                    type: 'GET',
                    url: 'http://localhost:8080/api/tracks/' + track.track_id
                }

            }
            //If genreName presents, filter the track
            //extract string to JSON.format()
            //if(JSONITEM.genre_title === genreName)
            data.push(response)
        })

        res.status(200).json({ data })
    } catch (error) {
        console.log(error)
    }

}

const searchTrackByTitle = async (req, res) => {
    //const user = req.param.id;
    console.log("request params ", req.param);
    console.log("request query ", req.query);
    try {
        //const track = await Track.find( { $or: [ { track_title:req.body.name }, { artist_name:req.body.name } ]}).limit(req.body.limits).sort(req.body.sort);
        const track = [{}]
        const response = {
            _id: track._id,
            track_id: track.track_id,
            album_id: track.album_id,
            track_id: track.track_id,
            track_name: track.track_name,
            tags: track.tags,
            track_date_created: track.track_date_created,
            track_date_recorded: track.track_date_recorded,
            track_duration: track.track_duration,
            track_genres: track.track_genres,
            track_number: track.track_number,
            track_title: track.track_title,
            request: {
                type: 'GET',
                url: 'http://localhost:8080/api/tracks/' + track.track_id
            }

        }
        res.status(200).json({ response })
    } catch (error) {
        console.log(error)
    }

}

// const searchTrackByTitle = async (req, res) => {
//     try {
//         console.log("request params ", req.param);
//         console.log("request query ", req.query);

//         //const track = await Track.find( { artist_name:req.body.name });
//         //const track = await Track.find( { $or: [ { track_title:req.body.name }, { artist_name:req.body.name } ]}).limit(req.body.limits).sort(req.body.sort);
//         const track = [{}]
//         console.log('response: ', track)
//         res.status(200).json({results:{
//             count:track.length,
//             tracks: track
//         }})
//     } catch (error) {
//          console.log(error)
//     }
// }

module.exports = { getAllTracks, getTrack, searchTrackByTitle }

