'use strict';

module.exports = function logger(request, response, next) {
    console.log(`method: ${request.method}, path: ${request.path}`);

    next();
}