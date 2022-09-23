const express = require('express');
const expressHandlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

require('./lib/db.js');
const authRouter = require('./routers/auth_router.js');
const taskRouter = require('./routers/task_router.js');
const auth = require("./repositories/auth");
const { globalHandler, handler404 } = require('./lib/error_handlers.js')

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

app.use('/', authRouter);
app.use('/tasks', taskRouter);

app.use(globalHandler);

app.use(handler404);

app.listen(port, () => console.log(`TaskList app started on http://localhost:${port}`));
