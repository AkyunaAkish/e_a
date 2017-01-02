# Space Cadevs

## Collective Tech

Setup Instructions:

```
fork/clone

$ npm i

$ touch .env

generate a secret:
$ echo SECRET=$(node -e "require('crypto').randomBytes(48, function(ex, buf) { console.log(buf.toString('hex')) });") >> .env

add to your .env file according to the .env.example file

$ createdb spacecadevs

$ knex migrate:latest
```

To Run Development Environment:

```
in one tab of your terminal:
$ npm run dev

in another tab of your terminal:
$ nodemon

go to localhost:8080
```
