[![Build Status](https://travis-ci.org/Kevnz/fuxor.png?branch=master)](https://travis-ci.org/Kevnz/fuxor)
# Fuxor

Very simple DI for node.

```
const fuxor = require('fuxor');
fuxor.add({ name: 'fs', result: {
	readFileSync: function () {
		return 'Not really a file';
	}
});
const fs = require('fs');
console.log(fs.readFileSync('not really', 'anything', { whatever:'you want'}));//'Not really a file'

```

### API
#### Add
```
const fuxor = require('fuxor');
// Add one entry to be overridden 
fuxor.add({ name: 'fs', result: {
  readFileSync: function () {
    return 'Not really a file';
  }
});
// Add multiple entries at once
fuxor.add([{ name: 'fs', result: {
  readFileSync: function () {
    return 'Not really a file';
  }
}, {
  name: 'request',
  result: function () {
    return 'Not really a file';
  }
}]);
```

#### Clear
```
const fuxor = require('fuxor');
// After items have been added
fuxor.clear(); // All entries have been removed
```

#### remove
```
const fuxor = require('fuxor');
// After items have been added
fuxor.remove('your-module'); // The module has been removed
```

#### reset
```
const fuxor = require('fuxor');
// After items have been added
fuxor.reset(); // require now works back to normal
```

