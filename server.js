const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoClient = require('mongodb').MongoClient;
const config = require('./config');
const apiRoutes = express.Router();
const routes = require('./routes');
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));

app.listen(port);
console.log('Connected on port ' + port);

mongoClient.connect(config.database, function(err, client) {
    if (err) console.error('Error with Mongo connecting!', err)
    console.log('Connected successfully to mongo mLab');
    const db = client.db('node-token-app');
    routes(app, apiRoutes, db);
});