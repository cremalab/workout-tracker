'use strict';

const Hapi = require('hapi'),
      mongoose = require('mongoose'),
      User = require('../models/User'),
      AuthBearer = require('hapi-auth-bearer-token'),
      HapiAuthJWT = require('hapi-auth-jwt2'),
      secret = 'secretkey';

const server = Hapi.server({    
    port: 5000,
    host: 'localhost'
});

const validate = async function (decoded, request) {
    // do your checks to see if the person is valid
    if (!user[decoded.id]) {
      return { isValid: false };
    }
    else {
      return { isValid: true };
    }
};

// const init = async () => {
//     await server.register(AuthBearer);
//     server.auth.strategy('simple', 'bearer-access-token', {
//         validate: async (request, token, h) => {
//             // here is where you validate your token
//             // comparing with token from your database for example
//             const isValid = token === '1234';

//             const credentials = { token };
//             const artifacts = { test: 'info' };
//             console.log({ isValid, credentials, artifacts })
//             return { isValid, credentials, artifacts };
//         }
//     });

//     server.auth.default('simple');

//     const routes = require('./routes');
//     server.route(routes);

//     await server.start();
//     return server;
// }

const init = async () => {
    await server.register(HapiAuthJWT);
    server.auth.strategy('jwt', 'jwt', {
        key: secret,
        validate: validate
    });

    server.auth.default('jwt');

    const routes = require('./routes');
    server.route(routes);

    await server.start();
    return server;
}

init().then(server => {
    console.log(`Server started at: ${server.info.uri}`)
})
.catch (error => {
    console.log(error)
})

var connStr = 'mongodb://127.0.0.1:27017/user-login';
mongoose.connect(connStr, function(err) {
    if (err) throw err;
    console.log('Successfully connected to MongoDB');
});


