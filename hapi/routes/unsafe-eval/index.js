'use strict';

exports.name = 'hapitestbench.unsafeeval';

/**
 * @param {string}  type - Name of property being accessed from the request.
 * @param {boolean} safe - Whether or not to make the route safe
 */
function baseHandler (type, safe, request, h) {
        // clean input ?
        let input = safe ? '' : request[type].input;
        eval(input);
        return "evaluated";
}

function makeHandler (type, safe) {
        return baseHandler.bind(this, type, safe);
}

exports.register = function unsafeEval(server, options) {
        server.route([
                {
                        method: 'GET',
                        path: '/',
                        handler: {
                                view: 'unsafe_eval'
                        }
                },
                {method: 'POST', path: '/post',     handler: makeHandler('payload', false)},
                {method: 'POST', path: '/postSafe', handler: makeHandler('payload', true)},
        ]);

        
        
};
