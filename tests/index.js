var test = require("tap").test;


test("Requiring overrides", function (t) { 
	
	var fs = require('fs');
	require('../index');
	var fs2 = require('fs');
	t.ok(fs !== fs2);
});