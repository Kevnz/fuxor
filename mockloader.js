'use strict';

var Module = require('module');

var _defaultLoad = Module._load;

var fs = require('fs');

var options = {};
if(process.env.NODE_ENV == 'test') {
    options = JSON.parse(fs.readFileSync('./test/container.json', {encoding:'utf8'}));
    console.log(options);
} else {
 try {
   options = fs.readFileSync('./container.json', {encoding:'utf8'});
 } catch (err) {
     console.log(__dirname);
     console.log(process.env)
 }
}
Module._load  = function(moduleName) {
        console.log("lol at you");
        console.log("no " + moduleName + " for you");
        console.log('WELL ACTUALLY');
        console.log(options)
        if (moduleName.indexOf('.') === 0) {
            //file, only di node modules
            return _defaultLoad(moduleName);
        }
        if (options.modules[moduleName]) {
            return {};
        }
        return _defaultLoad(moduleName);
}