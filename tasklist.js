const express = require('express');
const expressHandlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('./lib/db.js');
const {createProfile, getProfile, deleteProfile, createTask, deleteTask, editTask} = require("./lib/db");

const app = express();

app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main',
    extname: '.handlebars',
}));

app.set('view engine', 'handlebars');
app.set('views', './views');

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));


app.get('/', (req, res) => {
    res.type('text/plain');
    res.send('Hello!');
});

app.get('/sign-in', (req, res) => {
    res.type('text/plain');
    res.send('Sign IN!');
});

app.get('/sign-up', (req, res) => {
    res.type('text/plain');
    res.send('Sign UP!');
});

app.get('/auth', (req, res) => {
    res.type('text/plain');
    res.send('Auth!');
});

app.listen(port, () => console.log('TaskList app started on http://localhost:${port}'));


// createProfile('vlad@sff.dfdf', 'password').then((result) => {
//     console.log(result);
//     getProfile('vlad@sff.dfdf').then((result) => {
//         console.log('Found ', result);
//         deleteProfile('vlad@sff.dfdf').then((result) => {
//             console.log(result)
//         });
//     });
// });

// createProfile('vlad@mail.com', 'password')
//     .then(() => {
//
//     })
// getProfile('vlad@mail.com').then((profile) => {
//     console.log(profile)
//     createTask('hello', profile._id)
//         .then((result) => {
//             console.loge(result)
//         })
//     createTask('right', profile._id)
//         .then((result) => {
//             console.log(result)
//         })
// });

editTask("63295a688b824a02d54344c3")
    .then((res) => {
        console.log(res);
    });