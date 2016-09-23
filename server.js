// server.js
// -------------------------------------------
// This is the main file we are going to open on NodeJS

// Importing modules
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Initializing classes
var app = express();

// Using the json body parser
app.use(bodyParser.json());

// Users Schema
Users = require('./models/users');

// Connecting to Mongoose
var dbURI = 'mongodb://localhost/mongo-rest';

mongoose.connect(dbURI);
var db = mongoose.connection;

// Events for Mongoose Connection
db.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI);
});
db.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
});
db.on('disconnected', function () {
    console.log('Mongoose connection disconnected');
});
db.on('open', function () {
    console.log('Mongoose connection is open');
});

// Root
app.get('/', function (req, res) {
    res.send('There is no route here... Please use the "/api" endpoint.');
});

// GET Users
app.get('/api/users', function (req, res) {
    Users.getUsers(function (err, users) {
        // Error handler
        if (err) {
            throw err;
        }

        // Returns the users
        res.json(users);
    });
});

// CREATE Users
app.post('/api/users', function (req, res) {
    var user = req.body;

    // Adding a new User
    Users.addUser(user, function (err, user) {
        // Error handler
        if (err) {
            throw err;
        }

        // Returns the new user
        res.json(user);
    });
});

// UPDATE Users
app.put('/api/users/:_id', function (req, res) {
    var user = req.body;
    var id = req.params._id;

    Users.updateUser(id, user, {}, function (err, user) {
        // Error handler
        if (err) {
            throw err;
        }

        // Returns the updated user
        res.json(user);
    });
});

// DELETE Users
app.delete('/api/users/:_id', function (req, res) {
    var id = req.params._id;

    Users.removeUser(id, function (err, user) {
        // Error handler
        if (err) {
            throw err;
        }

        // Returns the deleted user
        res.json(user);
    });
});

// Opens the server on PORT 1337
app.listen(1337);
console.log('Running on port 1337');