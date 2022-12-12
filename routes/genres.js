/*----------BASE SETUP----------*/
const express = require('express');
const router = express.Router();
const Genre = require('../model/genres');
const {getAllGenres, getGenre, getGenreByName} = require('../contoller/genres')

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', getAllGenres );

router.get('/:id', getGenre)
router.get('/search', getGenreByName)

module.exports = router;
