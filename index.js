const Module = require('module');

const defaultLoad = Module._load;
const mappings =  new Map();
const namespaceMappings = new Map();
const path = require('path');

Module._load = function(moduleName, module) {
  if (moduleName.indexOf('.') === 0 && !mappings.has(moduleName)) {
    const path = defaultLoad('path');
    const parsedPath = path.parse(module.filename);
    const filePath = path.resolve(process.cwd(), parsedPath.dir, moduleName);
    return defaultLoad(filePath);
  }
  if (moduleName.indexOf('::') > -1) {
    console.log('from the _load cwd', process.cwd());
    console.log('from the _load __dirname', __dirname);
    const [ namespace, moduleToLoad ] = moduleName.split('::');
    console.log('namespace', namespace);
    const modulePath = path.join(process.cwd(), namespaceMappings.get(namespace), moduleToLoad);
    console.log('modulePath', modulePath);
    return defaultLoad(modulePath);
  }
  if (mappings.has(moduleName)) {
    return mappings.get(moduleName);
  }
  return defaultLoad(moduleName);
};

module.exports = {
  add: function (mapping, result) {
    if (Array.isArray(mapping)) {
      mapping.forEach(map => mappings.set(map.name, map.result));
    } else if (typeof mapping === 'string') {
      mappings.set(mapping, result);
    } else {
      mappings.set(mapping.name, mapping.result);
    }
  },
  clear: function () {
    mappings.clear();
  },
  remove: function (name) {
    mappings.delete(name);
  },
  reset: function () {
    Module._load = defaultLoad;
  },
  namespace: function(name, pathStart) {
    namespaceMappings.set(name, pathStart);
  }
}
