const express = require('express');
 morgan = require ('morgan');
 fs = require ('fs'),
 path = require ('path');

const app = express();


// Middleware - Morgan function (data logging)
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})

app.use(morgan('combined', {stream: accessLogStream}));

app.get('/', (req, res) => {
  res.send('Welcome to my Movie app!');
});

app.get('/secreturl', (req, res) => {
  res.send('This is a secret url with super top-secret content.');
});

//List of top movies
let topMovies = [
  {
    title: 'Sicario',
    director: 'Denis Villeneuve',
    'top cast': 'Emily Blunt, Josh Brolin, Benicio Del Toro',
  },
  {
    title: 'The Dark Knight',
    director: 'Christopher Nolan',
    'top cast': 'Christian Bale, Heath Ledger',
  },
  {
    title: 'Fight Club',
    director: 'David Fincher',
    'top cast': 'Brad Pitt, Edward Norton',
  },
  {
    title: 'Pulp Fiction',
    director: 'Quentin Tarantino',
    'top cast': 'John Travolta, Uma Thurman, Samuel L. Jackson',
  },

  {
    title: 'Interstellar',
    director: 'Christopher Nolan',
    'top cast': 'Matthew McConaughey, Anne Hathaway, Jessica Chastain',
  },
  {
    title: 'The Departed',
    director: 'Martin Scorsese',
    'top cast': 'Leonardo DiCaprio, Matt Damon, Jack Nicholson',
  },
  {
    title: 'Good Will Hunting',
    director: 'Gus Van Sant',
    'top cast': 'Matt Damon, Ben Affleck, Robin Williams',
  },
  {
    title: 'Die Hard',
    director: 'John McTiernan',
    'top cast': 'Bruce Willis, Alan Rickman, Bonnie Bedelia',
  },
  {
    title: 'Snatch',
    director: 'Guy Ritchie',
    'top cast': 'Jason Statham, Brad Pitt, Stephen Graham',
  },
  {
    title: 'Jurassic Park',
    director: 'Steven Spielberg',
    'top cast': 'Sam Neill, Laura Derrn, Jeff Goldblum',
  },


];

// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to my Movie list!');
});

app.get('/documentation', (req, res) => {                  
  res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/movies', (req, res) => {
  res.json(topMovies);
});

//Middleware error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// listen for requests
app.listen(8080, () =>{
  console.log('Your app is listening on port 8080.');
});