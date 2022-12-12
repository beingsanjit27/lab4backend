const mongoose = require("mongoose")
//Get all the matching artist IDs for a given search pattern matching the artist's name

const Artist = require("../model/raw_artists");

const getAllArtists = async (req, res) => {
    const artistName = req.query.artist_name; //extracting artist_name from Query params
    console.log("art name ", artistName)
    try {
        let artist = [];
        if(artistName) {
            artist = await Artist.find({ $or: [{ artist_name: artistName }] });
        } else {
            artist = await Artist.find();
        }
        
        const response = {
            count: artist.length,
            artist: artist.map(artist => {
                return {
                    _id: artist._id,
                    artist_id: artist.artist_id,
                    artist_name: artist.artist_name,
                    artist_bio: artist.artist_bio,
                    artist_location: artist.artist_location,
                    artist_website: artist.artist_website,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:8080/api/artist/' + artist._id
                    }

                }
            })

        }
        res.status(200).json({ response })
    } catch (error) {
        console.log(error)
    }
}



const getArtist = async (req, res) => {
    const user = req.param.id;
    try {
        const artist = await Artist.findOne({ artist_id: req.params.id });
        const response = {
            _id: artist._id,
            artist_id: artist.artist_id,
            artist_name: artist.artist_name,
            artist_bio: artist.artist_bio,
            artist_location: artist.artist_location,
            artist_website: artist.artist_website,
            request: {
                type: 'GET',
                url: 'http://localhost:8080/api/artist/' + artist.artist_id
            }

        }
        res.status(200).json({ response })
    } catch (error) {
        console.log(error)
    }

}

// const getArtistByName = async (req, res) => {
//     try {
//         const artistName = req.body.artist_name;
//         const artistId = req.body.artist_id;
        
//         const data = await Artist.find({ $or: [{ artist_name: artistName }, { artist_id: artistId }] });

//         const response = {
//             count: data.length,
//             artist: data.map(artist => {
//                 return {
//                     _id: artist._id,
//                     artist_id: artist.artist_id,
//                     artist_name: artist.artist_name,
//                     artist_bio: artist.artist_bio,
//                     artist_location: artist.artist_location,
//                     artist_website: artist.artist_website
//                 }
//             })
//         }
//         res.status(200).json({ response })
//     } catch (error) {
//         console.log(error)
//     }
// }

module.exports = { getAllArtists, getArtist }

