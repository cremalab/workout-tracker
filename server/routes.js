'use strict';

const User = require('../models/User'),
      Joi = require('joi'),
      HapiAuthCookie = require('hapi-auth-cookie');

module.exports = [
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
        options: {
            handler: async (request, h) => {
                //Using passport-local-mongoose for auth. Will add hapi-auth-cookie later
                let payload = JSON.parse(request.payload);
                User.authenticate()(payload.logInEmail, payload.logInPassword, (err, user) => {
                    if(err) console.log('Error: ' + err);
                    if(!user) {
                        console.log(request.auth.isAuthenticated);
                        console.log("not a user!");
                        return 'not successful';
                    }
                    //request.cookieAuth.set({ loggedIn: true, loggedInUser: payload.logInEmail });
                    //h.authenticate({credentials: payload.logInEmail})
                    console.log('user!');
                    return 'successful';
                });
                return request.auth.isAuthenticated;
            }
       }
    }
];