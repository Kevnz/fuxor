'use strict'
const Module = require('module')

const defaultLoad = Module._load
const mappings = new Map()
let wrapper

Module._load = function(moduleName, module) {
  if (wrapper) {
    const loadedModule = defaultLoad(moduleName, module)
    return wrapper(loadedModule)
  }
  if (moduleName.indexOf('.') === 0 && !mappings.has(moduleName)) {
    const path = defaultLoad('path')
    const parsedPath = path.parse(module.filename)
    const filePath = path.resolve(process.cwd(), parsedPath.dir, moduleName)
    return defaultLoad(filePath)
  }
  if (mappings.has(moduleName)) {
    return mappings.get(moduleName)
  }
  return defaultLoad(moduleName, module)
}

module.exports = {
  add: function(mapping, result) {
    if (Array.isArray(mapping)) {
      mapping.forEach(map => mappings.set(map.name, map.result))
    } else if (typeof mapping === 'string') {
      mappings.set(mapping, result)
    } else {
      mappings.set(mapping.name, mapping.result)
    }
  },
  clear: function() {
    mappings.clear()
    wrapper = null
  },
  remove: function(name) {
    mappings.delete(name)
  },
  reset: function() {
    Module._load = defaultLoad
  },
  wrap: function(wrapFunction) {
    wrapper = wrapFunction
  },
}
