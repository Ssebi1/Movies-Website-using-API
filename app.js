const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const fetch = require('node-fetch');
const path = require('path');
var url, resp;

const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

app.listen(port);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

const IMGPATH = 'https://image.tmdb.org/t/p/w500';

app.get('/', async (req, res) => {
	url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&page=1&api_key=' + process.env.API_KEY;
	resp = await fetch(url);
	const popularMovies = await resp.json();

	url = 'https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&page=1&api_key=' + process.env.API_KEY;
	resp = await fetch(url);
	const popularTvSeries = await resp.json();

	res.render('index', {
		popularMovies: popularMovies.results,
		popularTvSeries: popularTvSeries.results,
		IMGPATH
	});
});

app.use('/more', require('./routes/more'));
