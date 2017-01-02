require('dotenv').config();

module.exports = {
    development: {
        client: 'postgres',
        connection: process.env.DATABASE_URL
    },
    production: {
        client: 'postgres',
        connection: process.env.DATABASE_URL
    }
};
