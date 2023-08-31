import { Request, Response } from "express";
const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');
const session =require('express-session')
//const { title } = require('process');

const app = express();

//configure nunjucks
const appViews = path.join(__dirname, '/views');

const nunjucksConfig = {
    autoescape: true,
    coCache: true,
    express: app
};

nunjucks.configure(appViews, nunjucksConfig);

//configure Express
app.set('view engine', 'html');

app.use('/public',express.static(path.join(__dirname, 'public')));

app.use(express.json())

app.use(express.urlencoded({ extended: true }));

app.listen(3000, ()=> {
    console.log('Server listening on port 3000');
});

require('./controller/salesEmployeeController')(app);

//Express routes
