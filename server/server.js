'use strict';

const Hapi = require('hapi'),
      mongoose = require('mongoose'),
      User = require('../models/User');

const server = Hapi.server({    
    port: 5000,
    host: 'localhost'
});
server.start((err)=>{
    if(err)
        throw err;
    console.log(`Server started at: ${server.info.uri}`)
});

const routes = require('./routes');
server.route(routes);

var connStr = 'mongodb://127.0.0.1:27017/user-login';
mongoose.connect(connStr, function(err) {
    if (err) throw err;
    console.log('Successfully connected to MongoDB');
});