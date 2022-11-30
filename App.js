const express = require('express');
const App = express();
const path = require('path');

App.listen(3000);
App.set('view engine', 'ejs');

App.get('/', (req, res) => {
    res.render('index');
})

App.get('/about', (req, res) => {
    res.render('about');
})

App.get('/contact', (req, res) => {
    res.render('contact-me');
})

App.use((req, res) => {
    res.status(404).render('404');
})