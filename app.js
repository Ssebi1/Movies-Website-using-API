const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const fetch = require('node-fetch');
const path = require('path');
const bodyParser = require('body-parser');
var url, resp;

const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

app.listen(port);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.post('/movie/search', async (req, res) => {
	const { search } = req.body;
	url = `https://api.themoviedb.org/3/search/movie?query=${search}&api_key=${process.env.API_KEY}`;
	resp = await fetch(url);
	const searchMovies = await resp.json();

	if (search == '') {
		res.redirect('/more/popularMovies?page=1');
	}
	else {
		res.render('searchMovies', {
			searchMovies: searchMovies.results,
			IMGPATH,
			search,
			total_results: searchMovies.total_results
		});
	}
});

app.post('/tv/search', async (req, res) => {
	const { search } = req.body;
	url = `https://api.themoviedb.org/3/search/tv?query=${search}&api_key=${process.env.API_KEY}`;
	resp = await fetch(url);
	const searchTv = await resp.json();

	if (search == '') {
		res.redirect('/more/popularTvSeries?page=1');
	}
	else {
		res.render('searchTv', {
			searchTv: searchTv.results,
			IMGPATH,
			search: search.toUpperCase(),
			total_results: searchTv.total_results
		});
	}
});

app.use('/more', require('./routes/more'));
