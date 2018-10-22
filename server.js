const express = require('express');
const hbs = require('hbs');
const app = express();
const fs = require('fs');

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);

    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
        next();
    });
});

app.use((req, res, next) => {
    res.render('maintenance.hbs', {});
})
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.get('/', (req, res) => {
    //res.send('<h1>Hello World<h1>');
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Hello World'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});



app.get('/bad', (req, res) => {
    res.send('bad request');
})
app.listen(3000, () => {
    console.log('Server up');
});