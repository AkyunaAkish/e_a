const knex = require('../db_config/knex');

module.exports = (req, res, type) => {
    if (type == 'facebook') {
        return `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
                    <meta property='og:type' content='website' />
                    <meta content="Elena Akish's Blog Title" property="og:title">
                    <meta content="Elena Akish's Blog Description" property="og:description">
                    <meta property="og:url" content="http://www.elenaakish.com" />
                    <meta content="https://docs.google.com/uc?id=0Bw6Wv889sj3vUk9ORXFiZW5mZG8" property="og:image">
                    <title>Elena Akish's Blog</title>
                </head>
                <body>
                    
                </body>
                </html>`;
    } else if (type == 'twitter') {
        return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <meta content="http://www.elenaakish.com" name="twitter:site">
                <meta content="summary" name="twitter:card">
                <meta content="Elena Akish's Blog Title" name="twitter:title">
                <meta content="Elena Akish's Blog Description" name="twitter:description">
                <meta content="https://docs.google.com/uc?id=0Bw6Wv889sj3vUk9ORXFiZW5mZG8" name="twitter:image:src">
                <title>Elena Akish's Blog</title>
            </head>
            <body>
                
            </body>
            </html>`;
    }
};