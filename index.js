require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var SpotifyWebApi = require('spotify-web-api-node')

// JSON web token dependencies, including a secret key to sign the token
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var secret = process.env.JWT_SECRET;
var spotifyApi = new SpotifyWebApi();

var app = express();

// mongoose models and connection
var mongoose = require('mongoose');
var Favorite = require('./models/favorite');
mongoose.connect('mongodb://localhost/lyrical'); //connect to your database name

// decode POST data in JSON and URL encoded formats
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('morgan')('dev'));

// app.use('/api/recipes', expressJWT({ secret: secret }), require('./controllers/recipes')); change this
// app.use('/api/users', expressJWT({ secret: secret }).unless({
//     path: [{ url: '/api/users', methods: ['POST'] }]
// }), require('./controllers/favorites'));

// this middleware will check if expressJWT did not authorize the user, and return a message
// app.use(function(err, req, res, next) {
//     if (err.name === 'UnauthorizedError') {
//         res.status(401).send({ message: 'You need an authorization token to view this information.' });
//     }
// });

// POST /api/auth - if authenticated, return a signed JWT


app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
