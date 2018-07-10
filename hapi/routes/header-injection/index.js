'use strict';

exports.name = 'hapitestbench.headerinjection';

function handler(request, h) {
        const res = h.response('success');
        res.type('text/html');
        res.header('X-Custom', 'test');
        res.header(request.query.key, request.query.value);
        return res;
}

exports.register = function headerInjection(server, options) {
        server.route([
                {
                        method: 'GET',
                        path: '/',
                        handler: {
                                view: 'header-injection'
                        }
                },
                {method: 'GET', path: '/get', handler: handler}
        ]);
};
