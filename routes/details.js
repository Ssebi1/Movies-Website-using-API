const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const IMGPATH = 'https://image.tmdb.org/t/p/original';
var url, resData;

router.get('/movie', async (req, res) => {
    const id = req.query.id;
    url = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}`;
    resData = await fetch(url);
    const movie = await resData.json();

    url = `https://api.themoviedb.org/3/movie/${id}/similar?page=1&api_key=${process.env.API_KEY}`;
    resData = await fetch(url);
    const similarMovies = await resData.json();

    res.render('viewMovie', {
        similarMovies: similarMovies.results,
        movie,
        IMGPATH,
    });
});

router.get('/tvseries', async (req, res) => {
    const id = req.query.id;
    url = `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.API_KEY}`;
    resData = await fetch(url);
    const tvSeries = await resData.json();

    url = `https://api.themoviedb.org/3/tv/${id}/similar?page=1&api_key=${process.env.API_KEY}`;
    resData = await fetch(url);
    const similarTvSeries = await resData.json();

    res.render('viewTv', {
        similarTvSeries: similarTvSeries.results,
        tvSeries,
        IMGPATH,
    });
});

module.exports = router;
