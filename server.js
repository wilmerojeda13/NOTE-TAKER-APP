// Requires Modules for the project
const express = require('express')
const notes = require('./db/db.json');
const path = require('path');
const fs = require('fs');


//Setting the server and initiating the app
const app = express();
const PORT = process.env.PORT || 5000;

//Parse incoming string or array data
app.use(express.urlencoded( {extended: true}));
//Parse incoming json data
app.use(express.json());
//Parse the path route 
app.use(express.static( 'public'));

//HTML call
app.get('/' , function (req, res)  {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

// Note HTML call
app.get('/notes' , function (req, res)  {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

// Setting up the note routes for the API
app.route('/api/notes', function(req,res) {
    res.json(notes);
})

// Add post function to create a note 
.post(function (req, res) {
    let jsonFilePath = path.join(__dirname, '/db/db.json')
    let newNote = req.body
})



