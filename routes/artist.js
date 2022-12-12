/*----------BASE SETUP----------*/
const express = require('express');
const router = express.Router();
const {getAllArtists, getArtist, getArtistByName} = require('../contoller/artist')


router.get('/', getAllArtists);

router.get('/:id', getArtist);

// router.get('/search', getArtistByName);


module.exports = router;
