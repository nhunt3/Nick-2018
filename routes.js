'use strict'
const NodeRSA = require('node-rsa');
const bcrypt = require('bcrypt');
const fs = require('fs');

module.exports = function(app, apiRoutes, db) {
    apiRoutes.post('/createUser', function(req, res) {
        db.collection('users').findOne({name: req.body.username}, function(err, result) {
            if (err) console.error('Error signing up ', err);
            if (result === null) {
                const saltRounds = 10;
                bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
                    const user = {
                        "name": req.body.username,
                        "password": hash
                    };

                    db.collection('users').insertOne(user, function(err, data) {
                        if (err) console.error('Error creating new user ', err);
                        res.json({message: "successfully created new user!"})
                    });
                });
            }
            else {
                res.json({message: "This username already exists in the database. Please choose another username."})
            }
          });
    });

    apiRoutes.post('/storePublicKey', function(req, res) {
        checkNameAndPassword(req, res, storePublicKey);
    });

    apiRoutes.post('/sign', function(req, res) {
        checkNameAndPassword(req, res, sign);
    });

    apiRoutes.get('/verify', function(req, res) {
        fs.readFile('./keys/signature.txt', 'utf8', function(err, signature) {
            if (signature !== '') {
                fs.readFile('./keys/public.key', 'utf8', function(err, publicKey) {
                    if (publicKey !== '') {
                        const key = new NodeRSA(publicKey);
                        const verified = key.verify('my data', signature, 'base64', 'base64'); 
                        
                        if (verified) {
                            res.json({message: 'This key has been signed!.'});
                        }
                        else {
                            res.json({message: 'The key has been incorrectly signed.'});
                        }
                    }
                    else {
                        res.json({message: 'No public key has been uploaded yet.'});
                    }
                });
            }
            else {
                res.json({message: 'The key has not yet been signed.'});
            }
        });
    });

    const checkNameAndPassword = function(req, res, func) {
        db.collection('users').findOne({
            name: req.body.username
        }, function(err, user) {
            if (err) console.log('Error!! ', err)
            if (!user) {
                res.json({message: 'Authentication failed. User not found'});
            }
            else if (user) {
                bcrypt.compare(req.body.password, user.password, function(err, passwordMatches) {
                    if (passwordMatches) {
                        func(req, res);
                    }
                    else {
                        res.json({message: 'Authentication failed. Wrong password.'});
                    }
                });
            }
        });
    };
    
    const sign = function(req, res) {
        const key = new NodeRSA(req.body.privateKey);
        const signature = key.sign('my data', 'base64', 'base64');
    
        fs.writeFile('./keys/signature.txt', signature, function (err) {
            if (err) console.error('Error writing to signature file', err);
    
            res.json({message: 'Key signed!'});
        });
    };
    
    const storePublicKey = function(req, res) {
        fs.writeFile('./keys/public.key', req.body.publicKey, function (err) {
            if (err) console.error('Error writing to signature file', err);
    
            res.json({message: 'Public key stored successfully!'});
        });
    };
    
    app.use('/api', apiRoutes);
}