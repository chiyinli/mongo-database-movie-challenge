const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Film = require('./models/movies');
const methodOverride = require('method-override');

dotenv.config({ path: './.env' });

const app = express();

app.use(express.urlencoded());
app.use(express.json());

app.use(methodOverride('_method'));

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB is connected"));

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));
app.set('view engine', 'hbs');

app.get('/', async (req, res) => {
    try {
        const films = await Film.find();
        console.log(films);

        res.render('index', {
            data: films
        })

    } catch (error) {
        
    }
    
});

app.get('/', async (req, res) => {
    try {
        const films = await Film.find().sort({"year":1});
        console.log(films);
        res.render('index', {
            data: films
        });
    } catch (error) {
        status: error.message;
        console.log(films);
    }
});

app.get('/register', (req, res) => {
    res.render('register');
})

app.post('/register/movies', async (req, res) => {
    console.log(req.body);
    const film = req.body.film_name;
    const actor = req.body.film_actor;
    const costar = req.body.film_costar
    const description = req.body.film_description;
    const year = req.body.film_year;
    const imdb = req.body.film_imdb;
    try {
        const newFilms = await Film.create({
            film: film,
            actor: actor,
            costar: costar,
            description: description,
            year: year,
            imdb: imdb
        })
        res.status(201).json(newFilms);
    } catch (error) {
        console.log(error.message);
        res.status(400).json({
            status: error.message

        });
        res.send('<h1>Movie Registered</h1>');
    }
});


   

app.put('/edit/:id', async (req, res) => {
    const filmId = req.params.id;

    const film = await Film.findById(filmId);

    res.render('edit', {
        data: film
    })
})

app.put('/edit/:id/success', async (req, res) => {
    const filmId = req.params.id;

    const filmUpdate = await Film.findByIdAndUpdate(filmId, {
        film: req.body.film_name,
        actor: req.body.film_actor,
        costar: req.body.film_costar,
        description: req.body.film_description,
        year: req.body.film_year,
        imdb: req.body.film_imdb
    })

    res.status(200).send('<h1>Movie Updated</h1>')
    console.log(filmUpdate);
})

app.delete('/delete/:id', async (req, res) => {
    const filmId = req.params.id;

    const filmToDelete = await Film.findByIdAndRemove(filmId);

    res.send('<h1>Movie Deleted</h1>');
    console.log(filmToDelete);
})
    
app.listen(5000, (req, res) => {
    console.log("server is running on port 5000");
})