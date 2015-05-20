'use strict';

var Module = require('module');

var _defaultLoad = Module._load;

var mappings =  {};

Module._load  = function(moduleName) {
        if (moduleName.indexOf('.') === 0) {
            //file, only di node modules
            return _defaultLoad(moduleName);
        }
        if (mappings[moduleName]) {
            return mappings[moduleName];
        }
        return _defaultLoad(moduleName);
}

module.exports = {
    add: function (mapping) {
        mappings[mapping.name] = mapping.result;
    },
    remove: function (name) {
        mappings[name] = null;
        delete mappings[name];
    }
}