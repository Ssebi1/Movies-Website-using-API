const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.listen(port);

app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('index.ejs'));
