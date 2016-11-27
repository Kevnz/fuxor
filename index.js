const Module = require('module');

const defaultLoad = Module._load;
const mappings =  new Map();

Module._load = function(moduleName, module) {
  if (moduleName.indexOf('.') === 0 && !mappings.has(moduleName)) {
    const path = defaultLoad('path');
    const parsedPath = path.parse(module.filename);
    const filePath = path.resolve(process.cwd(), parsedPath.dir, moduleName);
    return defaultLoad(filePath);
  }
  if (mappings.has(moduleName)) {
    return mappings.get(moduleName);
  }
  return defaultLoad(moduleName);
};

module.exports = {
  add: function (mapping) {
    if (Array.isArray(mapping)) {
      mapping.forEach(map => mappings.set(map.name, map.result));
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
  }
}
