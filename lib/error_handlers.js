const globalHandler = (err, req, res, next) => {
    res.status(500);
    res.render('500', {error: err});
}

const handler404 = (req, res) => {
    res.status(404);
    res.render('404');
}

module.exports = {
    globalHandler,
    handler404,
};