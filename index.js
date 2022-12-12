const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')


const trackRoutes = require('./routes/tracks');
const genreRoutes = require('./routes/genres');
const artistRoutes = require('./routes/artist');
const listRoutes = require('./routes/list');

const app = express();



let dev_db_url = 'mongodb+srv://root:abcd1234@myapp.prthu.mongodb.net/music?retryWrites=true&w=majority';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);


app.use(cors({credentials: true}));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/tracks', trackRoutes);
app.use('/api/genres', genreRoutes);
app.use('/api/artist', artistRoutes);
app.use('/api/list', listRoutes)

app.listen('8080', ()=>{
    console.log("Listening to port 8080");
})