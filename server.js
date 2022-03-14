// Requires Modules for the project
const express = require('express');
const {notes} = require('./db/db.json');
const path = require('path');
const fs = require('fs');

//Setting the server and initiating the app
const app = express();
const PORT = process.env.PORT || 3000

//Parse incoming string or array data
app.use(express.urlencoded( {extended: true}));
//Parse incoming json data
app.use(express.json());
//Parse the path route 
app.use(express.static(path.join(__dirname, 'public')));

