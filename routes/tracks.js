/*----------BASE SETUP----------*/
const express = require('express');
const router = express.Router();
const Track = require('../model/raw_tracks');
const {getAllTracks, getTrack, searchTrackByTitle} = require('../contoller/track')
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', getAllTracks);

router.get('/searchTrack', getTrack);

router.get('/search', searchTrackByTitle)

module.exports = router;
