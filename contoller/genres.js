const mongoose = require("mongoose")


const Genre = require("../model/genres");

const getAllGenres = async (req, res) => {
    try {
       const genre = await Genre.find();
       
     res.status(200).json({genre})
    } catch (error) {
        console.log(error)
    }
}



const getGenre = async (req, res) => {
    
    try {
        const genre = await Genre.findOne({genre_id:req.params.id});
        res.status(200).json({genre})
    } catch (error) {
         console.log(error)
    }
       
}

const getGenreByName = async (req, res) => {
    try {
        const genre = await Genre.find({title:'Blues'});
        res.status(200).json({genre})
    } catch (error) {
         console.log(error)
    }
}

module.exports = { getAllGenres, getGenre, getGenreByName}

