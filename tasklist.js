const express = require('express');
const expressHandlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('./lib/db.js');

const task = require('./repositories/task.js');
const user = require('./repositories/user.js');

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

app.listen(port, () => console.log(`TaskList app started on http://localhost:${port}`));


// createProfile('vlad@sff.dfdf', 'password').then((result) => {
//     console.log(result);
//     getProfile('vlad@sff.dfdf').then((result) => {
//         console.log('Found ', result);
//         deleteProfile('vlad@sff.dfdf').then((result) => {
//             console.log(result)
//         });
//     });
// });
//
// user.createProfile('mike@mail.com', 'password')
//     .then((res) => {
//         console.log(res)
//     })
// user.getProfile('vlad@mail.com').then((profile) => {
//     console.log(profile)
//     task.createTask('hello', profile._id)
//         .then((result) => {
//             console.log(result)
//         })
//     task.createTask('right', profile._id)
//         .then((result) => {
//             console.log(result)
//         })
// });

task.markAsUnDone("632970ddf4c4351b92cf33ab")
    .then((res) => {
        console.log(res);
    });

// user.getProfile('vlad@mail.com').then((profile) => {
//     task.getAllTasks(profile._id)
//         .then(res => {
//             console.log(res);
//         });
// });r