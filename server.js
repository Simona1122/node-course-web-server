const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


let app = express();

hbs.registerPartials(`${__dirname}/views/partials`);
app.set('view_engine', 'hbs');
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
    let now = new Date().toString();

    let log = (`${now}: ${req.method} ${req.url}`);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log')
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});


app.get('/', (req, res) => {
    // res.send('Hello Express!');
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome'
    });
});

app.get('/projects', (req, res) => {
    // res.send('Hello Express!');
    res.render('home.hbs', {
        pageTitle: 'Project Page',
        welcomeMessage: 'Welcome projects'
    });
});

app.get('/about', (req, res) => {
   res.render('about.hbs', {
       pageTitle: 'About Page'
   });
});

app.get('/bad',(req, res) => {
    res.send({
        errorMessage: 'Unable to fulfill this request.'
    })
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});

