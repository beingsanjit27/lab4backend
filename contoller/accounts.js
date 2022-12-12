const mongoose = require("mongoose")

const account = require("../model/accounts");

const createAccount = async (req, res) => {
    const account_name = req.query.account_name; //extracting artist_name from Query params
    console.log("account name: ", artistName)
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

const getAccount = async (req, res) => {
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

const updateAccount = async (req, res) => {
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