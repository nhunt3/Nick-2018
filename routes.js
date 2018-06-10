'use strict'
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = function(app, apiRoutes, db) {
    apiRoutes.post('/signup', function(req, res) {
        db.collection('users').findOne({name: req.body.name}, function(err, result) {
            if (err) console.error('Error signing up ', err);
            if (result === null) {
                const saltRounds = 10;
                bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
                    const user = {
                        "name": req.body.name,
                        "password": hash
                    };

                    db.collection('users').insertOne(user, function(err, data) {
                        if (err) console.error('Error creating new user ', err);
                        res.json({"success": "successfully created new user!"})
                    });
                });
            }
            else {
                res.json({"error": "This username already exists in the database. Please choose another username."})
            }
          });
    });
    
    apiRoutes.post('/login', function(req, res) {
        db.collection('users').findOne({
                name: req.body.name
            }, function(err, user) {
                if (err) console.log('Error!! ', err)
                if (!user) {
                    res.json({
                        success: false,
                        message: 'Authentication failed. User not found'
                    });
                }
                else if (user) {
                    bcrypt.compare(req.body.password, user.password, function(err, passwordMatches) {
                        if (passwordMatches) {
                            // if user found and password is correct, then create a token
                            const token = jwt.sign(user, app.get('superSecret'), {
                                expiresIn: 60*60*24 // expires in 24 hours
                            });
        
                            res.json({
                                success: true,
                                message: 'Enjoy your token!',
                                token: token
                            });
                        }
                        else {
                            res.json({
                                success: false,
                                message: 'Authentication failed. Wrong password.'
                            });
                        }
                    });
                }
            }
        );
    });
    
    // route middleware to verify token
    apiRoutes.use(function(req, res, next) {
        if (req.originalUrl !== '/api/signup') { // don't verify token for the signup route
            const token = req.body.token || req.query.token || req.headers['x-access-token'];
        
            if (token) {
                jwt.verify(token, app.get('superSecret'), function(err, decoded) {
                    if (err) {
                        return res.json({success: false, message: 'Failed to authenticate token'});
                    }
                    else {
                        req.decoded = decoded;
                        next();
                    }
                });
            }
            else {
                return res.status(403).send({
                    success: false,
                    message: 'No token provided'
                });
            }
        }
        else {
            next();
        }
    });
    
    apiRoutes.get('/', function(req, res) {
        res.json({
            message: 'Welcome to API!'
        });
    });
    
    apiRoutes.get('/users', function(req, res) {
        db.collection('users').findOne({}, function(err, result) {
            if (err) throw err;
            res.json(result);
          });
    });
    
    app.use('/api', apiRoutes);
}

