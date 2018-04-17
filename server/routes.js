'use strict';

const User = require('../models/User'),
      Joi = require('joi'),
      passport = require('passport');

module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Users coming soon';
        }
    },
    {
        method: 'POST',
        path: '/api/users/',
        handler: async(request, h) => {
            var payload = JSON.parse(request.payload);
            const user = new User({
                email: payload.signUpEmail,
            });
            console.log(user);
            User.register(user, payload.signUpPassword, (err, user) => {
                console.log(user);
                if (err) {
                    console.log(err);
                    return next(err);
                }
                return user; 
            });
            return user;  
        }
    },
    {
        method: 'POST',
        path: '/api/users/login',
        // options: {
        //     auth: {
        //         // strategy: 'simple',
        //         // mode: 'optional'
        //     }
        // },
        handler: async (request, h) => {
            var payload = JSON.parse(request.payload);
            //console.log(request.auth);
            User.authenticate()(payload.logInEmail, payload.logInPassword, (err, user) => {
                console.log(user);
                //console.log(results);
                if(err) console.log('Error: ' + err);
                if(user) {
                    console.log("user!");
                    //request.auth.session.set(user);
                    return h.redirect('/');
                    //return 'successfully logged in';
                }
                return h.redirect('/login');
            });
            return payload;
         }
    }
];