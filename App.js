const express = require('express');
const App = express();
const path = require('path');
const mongoose = require('mongoose');
const dbURI = 'mongodb+srv://Zahin:<4hqBwkdQhhPw7i3n>@cluster0.fbu8nyb.mongodb.net/dummy?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true});

App.listen(3000);
App.set('view engine', 'ejs');

App.use(express.static('public'));

App.get('/', (req, res) => {
    res.render('index');
})

App.get('/about', (req, res) => {
    res.render('about');
})

App.get('/newBlog', (req, res) => {
    res.render('newBlog');
})

App.use((req, res) => {
    res.status(404).render('404');
})