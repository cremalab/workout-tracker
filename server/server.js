'use strict';

const Hapi = require('hapi'),
      mongoose = require('mongoose'),
      User = require('../models/User'),
      Path = require('path'),
      HapiAuthCookie = require('hapi-auth-cookie'),
      React = require('react');

const server = Hapi.server({    
    port: 5000,
    host: 'localhost',
    routes: {
        files: {
            relativeTo: Path.join(__dirname, '../client')
        }
    }
});

const start = async () => {

    await server.register(HapiAuthCookie);

    // hapi-auth-cookie validation. Will try to implement later
    // const validate = async (request, session) => {
    //     let payload = JSON.parse(request.payload);
    //     User.authenticate()(payload.logInEmail, payload.logInPassword, (err, user) => {
    //         if(err) console.log('Error: ' + err);
    //         if(!user) {
    //             console.log("not a user!");
    //         }
    //         console.log('user!');
    //         return {
    //             valid: true, 
    //             credentials: {
                    
    //             }};
    //         request.cookieAuth.set({ loggedIn: true, loggedInUser: payload.logInEmail });
    //     });
    // };

    server.auth.strategy('session', 'cookie', {
        password: 'Td2sXhE4Eghk8MBA3X96hgMqd66k8r2P',
        isSecure: false,
        //validateFunc: validate
    });
    server.auth.default({ strategy: 'session', mode: 'optional'});

    const routes = require('./routes');
    server.route(routes);

    await server.start();
    console.log(`Server started at: ${server.info.uri}`);
}

start();

var connStr = 'mongodb://127.0.0.1:27017/workout-tracker';
mongoose.connect(connStr, function(err) {
    if (err) throw err;
    console.log('Successfully connected to MongoDB');
});


