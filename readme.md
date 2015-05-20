# Fuxor

Very simple DI for node.

```
var fuxor = require('fuxor');
fuxor.add({ name: 'fs', result: {
	readFileSync: function () {
		return 'Not really a file';
	}
});

var fs = require('fs');

console.log(fs.readFileSync('not really', 'anything', {whatever:'you want'}));//'Not really a file'

```

This is really simple and naive and was written for my needs, but I'm happy to take pull requests