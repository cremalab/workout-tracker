'use strict';

const User = require('../models/User');

module.export = [
    {
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Users coming soon';
        }
    },
    {
        method: 'GET',
        path: '/{name}',
        handler: (request, h) => {
            return 'Hello, ' + encodeURIComponent(request.params.name);
        }
    }
];