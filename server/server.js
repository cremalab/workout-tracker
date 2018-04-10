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
server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
        return 'Users coming soon';
    }
});
server.route({
    method: 'GET',
    path: '/{name}',
    handler: (request, h) => {
        return 'Hello, ' + encodeURIComponent(request.params.name);
    }
});

var connStr = 'mongodb://127.0.0.1:27017/user-login';
mongoose.connect(connStr, function(err) {
    if (err) throw err;
    console.log('Successfully connected to MongoDB');
});

module.exports=server;