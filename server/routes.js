'use strict';

const User = require('../models/User'),
      bcrypt = require('bcrypt'),
      Boom =require('boom'),
      Joi = require('joi'),
      jwt = require('jsonwebtoken'),
      HapiAuthCookie = require('hapi-auth-cookie'),
      _ = require('lodash');

function hashPassword(password, cb) {
    // Generate a salt at level 10 strength
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            return cb(err, hash);
        });
    });
}

function createToken(user){
    return jwt.sign({ id: user._id, username: user.username})
}

module.exports = [
    {   //create user
        method: 'POST',
        path: '/api/users/',
        options:{
            auth: false,
            handler: async(request, h) => {
                let user = new User();
                user.email = request.payload.signUpEmail;
                user.password = request.payload.signUpPassword;
                hashPassword(request.payload.signUpPassword, (err, hash) => {
                    if (err) {
                      console.log(err)
                      //  throw Boom.badRequest(err);
                    }
                    user.password = hash;
                    user.save((err, user) => {
                      if (err) {
                        throw Boom.badRequest(err);
                      }
                      // If the user is saved successfully, issue a JWT
                      h({ id_token: createToken(user) }).code(201);
                    });
                });
                console.log(user)
                return user;
            }
        }
    },
    {
        method: 'POST',
        path: '/api/users/login',
        options: {
            handler: async (request, h) => {

            }
       }
    }
];


                // //Using passport-local-mongoose for auth
                // let payload = JSON.parse(request.payload);
                // try {
                //     let { user, ...result } = await User.authenticate()(payload.logInEmail, payload.logInPassword);

                //     if (result.error) {
                //         return h.response({}).code(401);
                //     }

                //     return { email: user.email, _id: user._id };
                
                // } catch(err) {
                //     console.log('Error: ' + err);
                //     return h.response({}).code(401);
                // }  
                // // await User.findOne({email: payload.signUpEmail}, (err, docs) => {
                // //     if (err) console.log(err);
                // //     console.log('user')
                // //     //if(user) ;
                // //     return payload.signUpEmail;
                // // })
                // // console.log('not a user');
                // return user;