/*----------BASE SETUP----------*/
const express = require('express');
const router = express.Router();
const List = require('../model/list');
const {createList, getLists, saveTrackToList, getTrackList, deleteTrackFromList} = require('../contoller/list')

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', getLists );

router.get('/:id', getTrackList)

router.post('/', createList)
router.put('/:listName', saveTrackToList)
router.delete('/:listName', deleteTrackFromList)


module.exports = router;