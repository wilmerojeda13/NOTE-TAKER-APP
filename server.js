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

// Calling and Including the roots for the folders
app.get('api/notes', (req, res) => {
    res.json(notes.slice(1))
})

//HTML call
app.get('/' , (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

// Note HTML call
app.get('/notes' , (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

// Setting up the note routes for the API
app.get('/api/notes', (req, res) => {
    res.json(notes);
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})


