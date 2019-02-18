# Fuxor

[![Build Status](https://travis-ci.org/Kevnz/fuxor.png?branch=master)](https://travis-ci.org/Kevnz/fuxor)

Very simple DI for node.

```js
const fuxor = require('fuxor')
fuxor.add('fs', {
	readFileSync: function () {
		return 'Not really a file'
	}
})
const fs = require('fs')
console.log(fs.readFileSync('not really', 'anything', { whatever:'you want'}))//'Not really a file'

```

### API

#### Add

Add what should be returned when the module is required

```js
const fuxor = require('fuxor')
// Add one entry to be overridden
fuxor.add('fs', {
  readFileSync: function () {
    return 'Not really a file'
  }
})
// Add one entry to be overridden
fuxor.add({ name: 'fs', result: {
  readFileSync: function () {
    return 'Not really a file'
  }
}});
// Add multiple entries at once
fuxor.add([{ name: 'fs', result: {
  readFileSync: function () {
    return 'Not really a file'
  }
}, {
  name: 'request',
  result: function () {
    return 'Not really a file'
  }
}])
```

#### Clear

Clear all entries

```js
const fuxor = require('fuxor');
// After items have been added
fuxor.clear() // All entries have been removed
```

#### remove

Remove individual module to restore the original module

```js
const fuxor = require('fuxor')
// After items have been added
fuxor.remove('your-module') // The module has been removed
```

#### reset

Resets all modules back to default

```js
const fuxor = require('fuxor')
// After items have been added
fuxor.reset() // require now works back to normal
```

