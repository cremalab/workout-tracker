'use strict';

const User = require('../models/User'),
      UserSession = require('../models/UserSession'),
      Joi = require('joi');

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
        path: '/api/users/{email}/{password}',
        handler: async(request, h) => {
            const user = new User({
                email: request.params.email,
                password: request.params.password
            });
            user.save( (err, user) => {
                if (err) throw err;
                return user.id;
            });
            return user;
        },
        options: {
            validate: {
                params: {
                    email: Joi.string().required(),
                    password: Joi.string().required()
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/api/login/',
        handler: (request, h) => {
            return request.payload.email
            User.findOne({
                $and: [
                    {email: request.payload.email},
                    {password: request.payload.password}
                ]
            }), (err, user) =>{
                if(user){
                    return user;
                } else {
                    return 'Noooo!';
                }
            }
            
        }
    }
];