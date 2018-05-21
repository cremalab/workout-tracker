'use strict';

const User = require('../models/User'),
      Workout = require('../models/Workout'),
      Joi = require('joi'),
      HapiAuthCookie = require('hapi-auth-cookie'),
      _ = require('lodash');

module.exports = [
    {   //create new user document on Sign Up
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
    {   //Authenticate user on Log In
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
    {   //Save uploaded profile pic to user's document
        method: 'POST',
        path: '/api/users/profilePic',
        handler: async(request, h) => {
            let payload = JSON.parse(request.payload);
            console.log(payload.user, payload.result[0].public_id)
            //Find user with email that's in redux state and update their profilePicId on DB
            User.findOne({email: payload.user.email}, (err, user) => {
                user.profilePicId = payload.result[0].public_id
                user.save(err => {
                    if (err) throw err
                })
            })
            return payload;  
        }
    },
    {   //Retrieve profile pic for logged in user
        method: 'GET',
        path: '/api/users/profilePic/{email}',
        handler: async(request, h) => {
            //Find user with that email and return profilePicId
            let { email } = request.params;
            let response = User.findOne({ email }, (err, user) => {
                if (err) return err;
                return h.response(user.profilePicId);
            })
            return response;  
        }
    },
    {   //Delete profile pic
        method: 'POST',
        path: '/api/users/profilePic/{email}',
        handler: async(request, h) => {
            //Find user with that email and return profilePicId
            let { email } = request.params;
            let response = User.findOneAndUpdate({ email }, { profilePicId: null }, (err, user) => {
                if (err) return err;
                console.log(user)
                return h.response(user.profilePicId);
            })
            return response;  
        }
    },
    {   //Save user profile info
        method: 'POST',
        path: '/api/users/profile',
        handler: async(request, h) => {
            let payload = JSON.parse(request.payload);
            //Find user with email that's in redux state and update their profile info on DB
            User.findOne({email: payload.user.email}, (err, user) => {
                user.profilePicId = payload.profilePicId,
                user.firstName = payload.firstName, 
                user.lastName = payload.lastName, 
                user.bio = payload.bio, 
                user.age = payload.age, 
                user.weight = payload.weight, 
                user.goalWeight = payload.goalWeight, 
                user.gender = payload.gender, 
                user.DOB = payload.DOB

                user.save(err => {
                    if (err) throw err
                })
            })
            return payload;  
        }
    },
    {   //Retrieve user profile info
        method: 'GET',
        path: '/api/users/profile/{email}',
        handler: async(request, h) => {
            //Find user with email that's in redux state and return user document
            let { email } = request.params;
            let response = User.findOne({ email }, (err, user) => {
                if (err) return err;
                return h.response(user);
            })
            return response;  
        }
    },
    {   //Save workout form data
        method: 'POST',
        path: '/api/workout/save',
        handler: async (request, h) => {
            let payload = JSON.parse(request.payload);
            let userId =''
            let currentUser = User.findOne({email: payload.user.email},'_id' ,(err, user) =>{
                if(err) return err;
                userId = user._id
                console.log(user._id)
            })
            .then( () =>{
                const workout = new Workout({
                    user: userId,
                    workout: payload.formData
                })
                workout.save((err) => {
                    if (err) {console.log(err); return err}
                    console.log('saved')
                });
            })
            
           
            return payload;
        }
    }
]