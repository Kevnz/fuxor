var test = require("tap").test;


test("Requiring overrides", function (t) { 
	
	var fs = require('fs');
	console.log('???')
	require('../mockloader');
	var fs2 = require('fs');
	//console.log(fs2);
	//t.notEqual(fs , fs2, "should not be the same");
	t.end();
});