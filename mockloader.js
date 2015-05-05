'use strict';

var Module = require('module');

var _defaultLoad = Module._load;

var fs = require('fs');
var options = fs.readFileSync('container.json', {encoding:'string'});

Module._load = function(moduleName) {
        console.log("lol at you");
        console.log("no " + moduleName + " for you");
        console.log('WELL ACTUALLY');
        
        if (moduleName.indexOf('.') === 0) {
            //file, only di node modules
            return _defaultLoad(moduleName);
        }
        
        return _defaultLoad(moduleName);
}