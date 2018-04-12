'use strict';

const User = require('../models/User'),
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
    }
];