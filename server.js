const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');

const users = require('./server/components/users/users.js');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/users', users);

app.all('*', (req, res, next) => {
    res.sendFile('index.html', {
        root: __dirname + '/dist/'
    });
});

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    });
}

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {}
    });
});

module.exports = app;
