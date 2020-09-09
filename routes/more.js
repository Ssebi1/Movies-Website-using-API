const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const IMGPATH = 'https://image.tmdb.org/t/p/w500';
var url, resData;

router.get('/popularMovies', async (req, res) => {
    var page = req.query.page;

    url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&page=${page}&api_key=${process.env.API_KEY}`;
    resData = await fetch(url);
    const popularMovies = await resData.json();

    res.render('popularMovies', {
        popularMovies: popularMovies.results,
        IMGPATH,
        page: parseInt(page),
    });
});

router.get('/popularTvSeries', async (req, res) => {
    var page = req.query.page;

    url = `https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&page=${page}&api_key=${process.env.API_KEY}`;
    resData = await fetch(url);
    const popularTvSeries = await resData.json();

    res.render('popularTvSeries', {
        popularTvSeries: popularTvSeries.results,
        IMGPATH,
        page: parseInt(page),
    });
});

module.exports = router;
