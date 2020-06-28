'use strict'
const Module = require('module')
const fs = require('fs')
const path = require('path')
const defaultLoad = Module._load
const mappings = new Map()
let wrapper
const loadedOrgs = new Map()

const fuxorLoad = function(moduleName, module) {
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
  if (!mappings.has(moduleName) && loadedOrgs.has(moduleName)) {
    return defaultLoad(loadedOrgs.get(moduleName))
  } else if (mappings.has(moduleName)) {
    return mappings.get(moduleName)
  }
  return defaultLoad(moduleName, module)
}
Module._load = fuxorLoad
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
  init: function() {
    mappings.clear()
    wrapper = null
    Module._load = fuxorLoad
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
  org: function(opts) {
    const modsToLoad = fs.readdirSync(opts.path)
    modsToLoad.forEach(dir => {
      loadedOrgs.set(`${opts.name}/${dir}`, path.join(opts.path, dir))
    })
  },
}
