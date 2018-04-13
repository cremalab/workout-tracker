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
        path: '/api/users/',
        handler: async(request, h) => {
            var payload = JSON.parse(request.payload);
            const user = new User({
                email: payload.signUpEmail,
                password: payload.signUpPassword
            });
            console.log(user);
            user.save( (err, user) => {
                if (err) throw err;
                return user.id;
            });
            return user;  
        }
    }
];