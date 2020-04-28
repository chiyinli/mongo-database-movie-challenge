const mongoose = require('mongoose');

const filmsSchema = new mongoose.Schema({
    film: {
        type: String,
        required: [true, 'Please type movie name']
    },
    actor: {
        type: String,
        required: [true, 'Please type who is the main star']
    },
    costar: {
        type: String,
        required: [true, 'Please type who is the co-star']
    },
    year: {
        type: Number,
        required: [true, 'Please type year of release'],
        minlength: 4
    },
    description: {
        type: String,
        required: [true, 'Please give a brief description of the movies']
    },
    imdb: {
        type: Number,
        required: [true, 'Please give the IMDB rating']
    }
})

module.exports = mongoose.model('Film', filmsSchema);