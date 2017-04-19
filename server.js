const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');

const users = require('./server/components/users/users.js');
const posts = require('./server/components/posts/posts.js');

const app = express();
let bot = false;

app.use(cors());
app.use(logger('dev'));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.all('*', (req, res, next) => {
    let ua = req.headers['user-agent'];
    console.log('IN MIDDLEWARE~~~~~~~~~~~~~~~~~~~~~~~~~~~', ua);

    if (/^(facebookexternalhit)|(Pinterest)/gi.test(ua)) {
        console.log(ua, req.params, ' ~~~~~~~~~~~~~~~~~~~~~~~~~~~~is a bot');
        bot = true;
        res.sendFile('facebook.html', {
            root: __dirname + '/server/social_media/templates/'
        });
    } else if (/^(Twitterbot)/gi.test(ua)) {
        console.log(ua, req.params, ' ~~~~~~~~~~~~~~~~~~~~~~~~~~~~is a bot');
        bot = true;
        res.sendFile('twitter.html', {
            root: __dirname + '/server/social_media/templates/'
        });
    } else {
        bot = false;
    }

    next();
});

if (!bot) {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.use(cookieParser());

    app.use('/users', users);
    app.use('/posts', posts);

    app.all('*', (req, res, next) => {
        console.log(' ~~~~~~~~~~~~~~~~~~~~~~~~is not a bot');
        res.sendFile('index.html', {
            root: __dirname + '/dist/'
        });
    });
}

module.exports = app;