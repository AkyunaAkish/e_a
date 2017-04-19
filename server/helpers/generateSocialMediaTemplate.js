const knex = require('../db_config/knex');
const _ = require('lodash');
const url = require('url');

module.exports = (req, res, type) => {
    return new Promise((resolve, reject) => {
        let hasParams = Object.keys(req.params).length > 0;
        let title = "Elena Akish's Blog";
        let image = 'https://docs.google.com/uc?id=0Bw6Wv889sj3vUk9ORXFiZW5mZG8';
        let site = 'http://www.elenaakish.com';
        let reqURL = url.format({
            protocol: req.protocol,
            host: req.get('host'),
            pathname: req.originalUrl,
        });
        console.log('URL~~~~~~~~~~~~~', reqURL);
        let postID;

        if (hasParams) {
            _.forOwn(req.params, (value, key) => {
                let valSplit = value.split('/');
                let hasPosts = /posts/gi.test(value);

                if (hasPosts) {
                    _.each(valSplit, (item) => {
                        Number(item) ? postID = Number(item) : null;
                    });
                }
            });
        }

        if (postID && Number(postID)) {
            knex('posts')
                .where({
                    id: postID
                })
                .first()
                .then((post) => {
                    console.log('POST', post);
                    if (post &&
                        typeof post == 'object' &&
                        Object.keys(post).length > 0) {
                        post.title ? title = post.title : null;
                        post.thumbnail_url ? image = post.thumbnail_url : null;
                    }

                    resolve(`<!DOCTYPE html>
                             <html lang="en">
                             <head>
                                <meta charset="UTF-8">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                                <meta property='og:type' content='website' />
                                <meta content="${title}" property="og:title">
                                <meta property="og:url" content="${reqURL}" />
                                <meta content="${image}" property="og:image">
                                <meta content="${reqURL}" name="twitter:site">
                                <meta content="summary" name="twitter:card">
                                <meta content="${title}" name="twitter:title">
                                <meta content="Come see what I'm up to" name="twitter:description">
                                <meta content="${image}" name="twitter:image:src">
                                <title>Elena Akish's Blog</title>
                             </head>
                             <body>
                                
                             </body>
                             </html>`);
                });
        } else {
            resolve(`<!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <meta http-equiv="X-UA-Compatible" content="ie=edge">
                        <meta property='og:type' content='website' />
                        <meta content="${title}" property="og:title">
                        <meta property="og:url" content="${reqURLurl}" />
                        <meta content="${image}" property="og:image">
                        <meta content="${reqURL}" name="twitter:site">
                        <meta content="summary" name="twitter:card">
                        <meta content="${title}" name="twitter:title">
                        <meta content="${image}" name="twitter:image:src">
                        <title>Elena Akish's Blog</title>
                    </head>
                    <body>
                        
                    </body>
                    </html>`);
        }
    });
};

// `<!DOCTYPE html>
//             <html lang="en">
//             <head>
//                 <meta charset="UTF-8">
//                 <meta name="viewport" content="width=device-width, initial-scale=1.0">
//                 <meta http-equiv="X-UA-Compatible" content="ie=edge">
//                 <meta property='og:type' content='website' />
//                 <meta content="Elena Akish's Blog Title" property="og:title">
//                 <meta content="Elena Akish's Blog Description" property="og:description">
//                 <meta property="og:url" content="http://www.elenaakish.com" />
//                 <meta content="https://docs.google.com/uc?id=0Bw6Wv889sj3vUk9ORXFiZW5mZG8" property="og:image">
//                 <meta content="http://www.elenaakish.com" name="twitter:site">
//                 <meta content="summary" name="twitter:card">
//                 <meta content="Elena Akish's Blog Title" name="twitter:title">
//                 <meta content="Elena Akish's Blog Description" name="twitter:description">
//                 <meta content="https://docs.google.com/uc?id=0Bw6Wv889sj3vUk9ORXFiZW5mZG8" name="twitter:image:src">
//                 <title>Elena Akish's Blog</title>
//             </head>
//             <body>

//             </body>
//             </html>`;