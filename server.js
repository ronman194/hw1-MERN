const express = require('express');
const app = express();

const dotenv = require("dotenv").config();
const port = process.env.PORT;

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('eror', eror => {
    console.log(eror)
});
db.once('open', () => {
    console.log('Connect to mongo');
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '1mb'
}));

app.use(bodyParser.json());

const postRouter = require('./routes/post_route.js');

app.use('/post', postRouter);


module.exports = app;