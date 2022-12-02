const { render } = require('ejs');
const express = require('express');
const App = express();
const mongoose = require('mongoose');
const dbURI = 'mongodb://Zahin:4hqBwkdQhhPw7i3n@ac-mogiaw5-shard-00-00.fbu8nyb.mongodb.net:27017,ac-mogiaw5-shard-00-01.fbu8nyb.mongodb.net:27017,ac-mogiaw5-shard-00-02.fbu8nyb.mongodb.net:27017/?ssl=true&replicaSet=atlas-owpcja-shard-0&authSource=admin&retryWrites=true&w=majority';
const Blog = require('./models/blog');

// connect with database
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => App.listen(3000))
    .catch((err) => console.log(err));

// template view engine
App.set('view engine', 'ejs');

// save objects in database 
App.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog 2',
        snippet: 'about my new blog',
        body: 'more about my new blog'
    })

    blog.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        })
})

App.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
})

// for public files like css
App.use(express.static('public'));
// pass form data to an object (db object)
App.use(express.urlencoded({ extended: true }));

App.get('/', (req, res) => {
    res.redirect('/blogs');
});

// show blogs in homepage
App.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'All Blogs', blogs: result })
        })
        .catch((err) => {
            console.log(err);
        })
})

App.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch((err) => console.log(err));
})

App.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render('details', { blog: result, title: 'Blog Details' });
        })
        .catch(err => {
            console.log(err);
        })
})

App.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs' })
        })
        .catch(err => console.log(err));
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