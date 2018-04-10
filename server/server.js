'use strict';

const Hapi = require('hapi'),
      mongoose = require('mongoose');

const server = Hapi.server({    
    port: 5000,
    host: 'localhost'
});


server.start((err)=>{
    if(err)
        throw err;
    console.log(`Server started at: ${server.info.uri}`)
});

//routes
// const routes = require('./routes/routes');
// server.route(routes);
const User = require('../models/User');
server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
        return 'Users coming soon';
    }
});
server.route({
    method: 'POST',
    path: '/api/users/{name}',
    handler: async(request, h) => {
        const user = new User({
            firstName: request.params.name
        });
        user.save( (err, user) => {
            if (err) throw err;
            return user.id;
        });
        return user;
    }
});


var connStr = 'mongodb://127.0.0.1:27017/user-login';
mongoose.connect(connStr, function(err) {
    if (err) throw err;
    console.log('Successfully connected to MongoDB');
});

module.exports=server;