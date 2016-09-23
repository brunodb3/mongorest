// users.js
// -------------------------------------------
// Here we declare and export the User Schema (similar to a Table on MySQL)

// Importing modules
var mongoose = require('mongoose');

// User Schema
var userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

// Exporting the User Schema
var User = module.exports = mongoose.model('User', userSchema);

// We also export functions (find, add, update and delete an user)
// Exporting Functions
// Find Users
module.exports.getUsers = function (callback, limit) {
    User.find(callback).limit(limit);
}

// Find User by ID
module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
}

// Adds a new User
module.exports.addUser = function (user, callback) {
    User.create(user, callback);
}

// Updates an User
module.exports.updateUser = function (id, user, options, callback) {
    var query = { _id: id };
    var update = {
        name: user.name,
        email: user.email
    };

    User.findOneAndUpdate(query, update, options, callback);
}

// Removes an User
module.exports.removeUser = function (id, callback) {
    var query = { _id: id };

    User.remove(query, callback);
}
