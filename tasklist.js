const express = require('express');
const expressHandlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

require('./lib/db.js');
const authRouter = require('./routers/auth_router.js');
const taskRouter = require('./routers/task_router.js');
const auth = require("./repositories/auth");

const app = express();

app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main',
    extname: '.handlebars',
}));

app.set('view engine', 'handlebars');
app.set('views', './views');

const port = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));


app.get('/', (req, res) => {
    res.render('index')
});

app.use('/tasks', async (req, res, next) => {
    // Check whether this user is logged in, else redirect to sign-in
    res.authorized = true;
    const userid = req.cookies.userId;
    if (!await auth.isUserActive(userid, req.ip)) {
        res.clearCookie('userId')
        res.authorized = false;
        res.redirect(303, 'sign-in');
    } else {
        next();
    }
});

// Reactivate user
app.use('/tasks', async (req, res, next) => {
    const userid = req.cookies.userId;
    if (res.authorized) {
        await auth.activateUser(userid, req.ip);
    }
    next();
});

app.use('/', authRouter);
app.use('/tasks', taskRouter);

app.use((err, req, res, next) => {
    res.status(500);
    res.render('500');
});

app.use((req, res) => {
    res.status(404);
    res.render('404');
});

app.listen(port, () => console.log(`TaskList app started on http://localhost:${port}`));

