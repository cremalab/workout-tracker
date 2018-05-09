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
                // await User.findOne({email: payload.signUpEmail}, (err, user) => {
                //     if (err) console.log(err);
                //     console.log('user')
                //     //if(user) ;
                //     return payload.signUpEmail;
                // })
                // console.log('not a user');
                return user;
            }
       }
    },
    {
        method: 'POST',
        path: '/api/users/profile',
        handler: async(request, h) => {
            var payload = JSON.parse(request.payload);
            console.log(payload.user, payload.result[0].public_id)
            //Find user with email that's in redux state and update their profilePicId on DB
            User.findOne({email: payload.user.email}, (err, user) => {
                user.profilePicId = payload.result[0].public_id
                user.save(err => {
                    if (err) throw err
                })
            })
            //console.log(payload, payload.result[0].url, payload.result[0].public_id);
            return payload;  
        }
    },
    {
        method: 'GET',
        path: '/api/users/profile/{email?}',
        handler: async(request, h) => {
            //Find user with that email and send pic to profile component
            //console.log(request.params)
            let {email} = request.params;
            let response = User.findOne({ email }, (err, user) => {
                if (err) throw err
                console.log(user.profilePicId)
                return h.response(user.profilePicId);
            })
            //console.log(payload, payload.result[0].url, payload.result[0].public_id);
            return response;  
        }
    }
]