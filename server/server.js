'use strict';

const Hapi = require('hapi'),
      mongoose = require('mongoose'),
      User = require('../models/User'),
      Path = require('path'),
      HapiAuthCookie = require('hapi-auth-cookie'),
      Vision = require('vision'),
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

    const cache = server.cache({ segment: 'sessions', expiresIn: 3 * 24 * 60 * 60 * 1000 });
    server.app.cache = cache;

    server.auth.strategy('restricted', 'cookie', {
        password: 'Td2sXhE4Eghk8MBA3X96hgMqd66k8r2P',
        cookie: 'sid-example',
        isSecure: false,
        redirectTo: false,
        redirectOnTry: false,
        //validateFunc: 
    });

    server.auth.default({strategy: 'restricted', mode: 'optional'});

    const routes = require('./routes');
    server.route(routes);

    await server.start();
    console.log(`Server started at: ${server.info.uri}`);
}

start();

var connStr = 'mongodb://127.0.0.1:27017/user-login';
mongoose.connect(connStr, function(err) {
    if (err) throw err;
    console.log('Successfully connected to MongoDB');
});


