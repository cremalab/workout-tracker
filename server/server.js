'use strict';

const Hapi = require('hapi'),
      mongoose = require('mongoose'),
      User = require('../models/User'),
      BasicAuth = require('hapi-auth-basic'),
      Bycrpt = require('bcrypt'),
      //passport = require('passport'),
      //LocalStrategy = require('passport-local').Strategy,
      Boom = require('boom');

const server = Hapi.server({    
    port: 5000,
    host: 'localhost'
});
server.start((err)=>{
    if(err) throw err;
    console.log(`Server started at: ${server.info.uri}`)
});

// const users = {
//     john: {
//         username: 'john',
//         password: '$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm',   // 'secret'
//         name: 'John Doe',
//         id: '2133d32a'
//     }
// };

const validate = async (request, email, password, h) => {
    const user = Users[email];
    console.log(user);
    if (!user) {
        return 'not a user!';
        return { credentials: null, isAuthenticated: false };
    }
    const isAuthenticated = await Bcrypt.compare(password, user.password);
    await Bcrypt.compare(password, user.password);
    const credentials = { id: user.id, email: user.email };
    return { isAuthenticated, credentials };
};

// server.register({
//     plugin: require('hapi-auth-basic')
// }).then ((err) => {
//     if (err) {
//          throw err;
//     }
//     server.auth.strategy('simple', 'basic', { validate });
//     server.route({
//         method: 'POST',
//         path: '/api/users/login',
//         options: {
//             auth: {
//                 strategy: 'simple',
//                 mode: 'optional'
//             }
//         },
//         handler: (request, h) => {
//             console.log(request);
//             return request.payload;
//          }
//     });
// });
//server.auth.strategy('simple', 'basic', { validate });
//server.auth.default('');

const routes = require('./routes');
server.route(routes);

var connStr = 'mongodb://127.0.0.1:27017/user-login';
mongoose.connect(connStr, function(err) {
    if (err) throw err;
    console.log('Successfully connected to MongoDB');
});