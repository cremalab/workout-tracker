'use strict';

const User = require('../models/User'),
      Joi = require('joi'),
      HapiAuthCookie = require('hapi-auth-cookie');

let uuid = 1; //just for example

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
        options: {
             plugins: { 
                'hapi-auth-cookie': { 
                    redirectTo: false
                } 
            },
            auth: {
                strategy: 'restricted',
                mode: 'try'
            },  
            handler: async (request, h) => {
                //trying to use passport-local-mongoose for auth and hapi-auth-cookie for cookie
                let payload = JSON.parse(request.payload);
                User.authenticate()(payload.logInEmail, payload.logInPassword, (err, user) => {
                    let redirectRoute = '';
                    if(err) console.log('Error: ' + err);
                    if(!user) {
                        console.log(request);
                        console.log("not a user!");
                        return redirectRoute = 'login';
                        return h.redirect('/login');
                    }
                    console.log('user!');
                    request.auth.isAuthenticated = true;
                    //const sid = String(++uuid);
                    //request.server.app.cache.set(sid, { user }, 0);
                    //console.log(request.server.app);
                    request.cookieAuth.set({ loggedIn: true, loggedInUser: payload.logInEmail });
                    //console.log(request.auth);
                    redirectRoute = 'dashboard';
                    return h.redirect('/dashboard')
                
                    //trying to use hapi-auth-cookie
                    //const { logInEmail, logInPassword } = request.payload;
                    // var payload = JSON.parse(request.payload);
                    // const user = User[payload.logInEmail];
                    // console.log(user);
                    // console.log(payload.logInEmail);
                    // return request.payload;
                });
                return h.redirect('/dashboard');
                //h.redirect('http://localhost:3000/' + redirectRoute);
             }
        }
    }
];