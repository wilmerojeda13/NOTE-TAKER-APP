// Requires Modules for the project
const express = require('express');
const {notes} = require('./db/db.json');
const path = require('path');
const fs = require('fs');

//Setting the server and initiating the app
const app = express();
const PORT = 