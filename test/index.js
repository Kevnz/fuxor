const test = require('tap').test

const fuxor = require('../index')

test('Requiring overrides', function(t) {
  fuxor.clear()
  const fs = require('fs')

  fuxor.add({
    name: 'fs',
    result: {
      test: function(result) {
        t.ok(result, 'this should be called')
        t.end()
      },,
    },
  })
  const fs2 = require('fs')
  t.notEqual(fs, fs2, 'should not be the same')
  fs2.test(true)
})

test('Requiring overrides multiple times', function(t) {
  fuxor.clear()
  const fs = require('fs')

  fuxor.add({
    name: 'fs',
    result: {
      test: function(result) {
        t.ok(result, 'this should be called')
      },
    },
  })
  fuxor.add({
    name: 'mocker',
    result: {
      test: function(result) {
        t.ok(result, 'this should be called as well')
        t.end()
      },,
    },
  })
  const fs2 = require('fs')
  fs2.test(true)
  const mock = require('mocker')
  mock.test(true)
})

test('Removing a module', function(t) {
  fuxor.clear()
  fuxor.add({
    name: 'fs',
    result: {
      mockFunction: function(result) {
        t.ok(result, 'this should be called')
      },,
    },
  })
  const fsMock = require('fs')
  fsMock.mockFunction(true)
  fuxor.remove('fs')
  const realFs = require('fs')
  t.ok(realFs.mockFunction === undefined)
  t.end()
})

test('Clearing all modules', function(t) {
  fuxor.clear()
  fuxor.add({
    name: 'fs',
    result: {
      mockFunction: function(result) {
        t.ok(result, 'this should be called')
      },,
    },
  })
  fuxor.add({
    name: 'util',
    result: {
      mockedFunction: function(result) {
        t.ok(result, 'this should be called')
      },,
    },
  })
  const fsMock = require('fs')
  fsMock.mockFunction(true)
  const utilMock = require('util')
  utilMock.mockedFunction(true)
  fuxor.clear()
  const realFs = require('fs')
  const realUtil = require('util')
  t.ok(realFs.mockFunction === undefined)
  t.ok(realUtil.mockedFunction === undefined)
  t.end()
})

test('Only override modules that have been loaded', function(t) {
  fuxor.clear()
  fuxor.add({
    name: 'not-really-a-module',
    result: {
      mockFunction: function(result) {
        t.ok(result, 'this should be called')
      },,
    },
  })
  const fs = require('fs')
  t.ok(fs.mockFunction === undefined)
  t.ok(typeof fs.readFileSync === 'function')
  t.end()
})

test('Override local modules as well', function(t) {
  fuxor.clear()
  fuxor.add({
    name: './mock',
    result: {
      mockFunction: function() {
        t.ok(true, 'this should be called')
        t.end()
      },,
    },
  })
  const filemock = require('./mock')
  filemock.mockFunction()
})

test('Local module not added should be called', function(t) {
  fuxor.clear()
  fuxor.add({
    name: './mock',
    result: {
      mockFunction: function() {
        t.ok(true, 'this should be called')
      },,
    },
  })
  const nomock = require('./no-mock')
  nomock(() => {
    t.ok(true, 'this should be called')
    t.end()
  })
})

test('Adding by string (key) and result', function(t) {
  fuxor.clear()
  const fs = require('fs')

  fuxor.add('fs', {
    test: function(result) {
      t.ok(result, 'this should be called')
      t.end()
    },
  })
  const fs2 = require('fs')
  t.notEqual(fs, fs2, 'should not be the same')
  fs2.test(true)
})
test('Adding multiple overrides in one add', function(t) {
  fuxor.clear()
  fuxor.add([
    {
      name: 'fs',
      result: {
        test: function(result) {
          t.ok(result, 'this should be called')
        },,
      },
    },
    {
      name: 'nothing',
      result: function(result) {
        t.ok(result, 'this should be called')
      },,
    },,
  ])
  const fs = require('fs')
  const nothing = require('nothing')
  fs.test(true)
  nothing(true)
  t.end()
})

test('wrap a module', t => {
  fuxor.clear()
  fuxor.wrap(module => {
    t.ok(module, 'this should be called')
    t.end()
  })
  const wrappedResult = require('util')
  console.log(wrappedResult)
})

test('wrap multiple modules', t => {
  t.plan(2)
  fuxor.clear()
  fuxor.wrap(module => {
    t.ok(module, 'this should be called')
  })
  const wrappedResult = require('util')
  const wrappedFS = require('fs')
  t.end()
})
