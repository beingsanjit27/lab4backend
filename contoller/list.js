const mongoose = require("mongoose")


const List = require("../model/list");
const Track = require("../model/raw_tracks");

const createList = async (req, res, next) => {

    const list = await List.findOne({ list_name: req.body.list_name })

    if (!list) {
        newList = new List(req.body)
        try {
            const savedList = await newList.save();
            res.status(200).json(savedList)
        } catch (error) {
            //next(error)
            res.send(500).json({ error: "Error occured" });
        }
    } else {
        res.status(200).json({ message: "List name exists" })
    }



}

const getPublicList = async (req, res, next) => {
    //TODO 
    const lists = await List.find().sort();
    const response = {
        count: lists.length,
        list: lists.map(l => {
            return {
                name: l.list_name,
                tracks: l.tracks,
                request: {
                    type: 'GET',
                    url: 'http://localhost:8080/api/list/' + l._id
                }
            }
        })
    }
    res.status(200).json(response)
}

const getLists = async (req, res, next) => {
    const lists = await List.find();
   /*  const newResponse = await lists.map(async l => {
        return {
            tracks: await getTrackDetails(l.tracks)
        }
    });

    console.log('newResponse ', newResponse) */

    const response = {
        count: lists.length,
        list: lists.map(l => {
            return {
                name: l.list_name,
                tracks: l.tracks,
                request: {
                    type: 'GET',
                    url: 'http://localhost:8080/api/list/' + l._id
                }
            }
        })
    }
    res.status(200).json(response)
}

const getTrackDetails = async (tracksIds) => {
    let tracks = [];
    await tracksIds.map(async (trackId) => {
        console.log('querying trackId : ', trackId)
        const track = await Track.find({ track_id: trackId });
        console.log("queried track: ", track[0])
        tracks.push(track[0]);
    });
    console.log("tracks: ", tracks)
    return tracks;
}

const getList = async (req, res) => {
    const list = await List.findById({ _id: req.params.id });
    res.status(200).json({ list })
}

const saveTrackToList = async (req, res, next) => {
    //req.query.attribute : url: localhost:3000/api/list?attribute=abc
    //req.params.attribute : url: localhost:3000/api/list/attribute
    //req.body.attribute : url: localhost:3000/api/list ..... body: { attribute: '' }

    const listName = req.params.listName; //extracting listId from URL params
    const trackID = req.body.tracks; //extracting list of tracks from JSON body
    console.log('listName ', listName);
    console.log('trackID ', trackID);
    //Save a list of track IDs to a given list name. Return an error if the list name does not exist. Replace
    //existing track IDs with new values if the list exists

    //Check for a list if it exists
    const foundList = await List.findOne({ list_name: listName })
    if (foundList) {
        console.log("found a list ", foundList)
        //list exists and we update/replace tracks

        try {
            //update the list that is found
            const response = await foundList.updateOne({ $set: { "tracks": trackID } });

            const newList = await List.findOne({ list_name: listName });

            res.status(200).json({ newList })
        } catch (error) {
            next(error)
        }
    } else {
        //Return an error if the list name does not exist
        res.status(404).json({ message: "The List does not exist" })
    }
}

const deleteTrackFromList = async (req, res, next) => {
    const listName = req.params.listName; // localhost:3000/api/list/myList1

    //Check for a list if it exists
    const foundList = await List.findOne({ list_name: listName })
    if (foundList) {
        try {
            const response = await foundList.updateOne({ $set: { "tracks": [] } });
            const newList = await List.findOne({ list_name: listName });
            res.status(200).json({ newList });
        } catch (error) {
            next(error)
        }
    } else {
        //Return an error if the list name does not exist
        res.status(404).json({ message: "The List does not exist" })
    }


}

const getTrackList = async (req, res) => {
    const listID = req.params.id;
    const list = await List.findById(listID)
    res.status(200).json({ tracks: list.tracks })
}


module.exports = { createList, getLists, getList, saveTrackToList, getTrackList, deleteTrackFromList, getPublicList }