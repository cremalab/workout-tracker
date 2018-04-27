'use strict';

const User = require('../models/User'),
      Joi = require('joi'),
      HapiAuthCookie = require('hapi-auth-cookie'),
      _ = require('lodash');

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
                //Using passport-local-mongoose for auth
                let payload = JSON.parse(request.payload);
                try {
                    let { user, ...result } = await User.authenticate()(payload.logInEmail, payload.logInPassword);

                    if (result.error) {
                        return h.response({}).code(401);
                    }

                    return { email: user.email, _id: user._id };
                
                } catch(err) {
                    console.log('Error: ' + err);
                    return h.response({}).code(401);
                }  
                // await User.findOne({email: payload.signUpEmail}, (err, docs) => {
                //     if (err) console.log(err);
                //     console.log('user')
                //     //if(user) ;
                //     return payload.signUpEmail;
                // })
                // console.log('not a user');
                return user;
            }
       }
    }
];