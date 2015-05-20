var test = require("tap").test;

var mocking = require('../index');
	
test("Requiring overrides", function (t) { 
	mocking.clear();
	var fs = require('fs');

	mocking.add({name:'fs', result: {
		test: function (result) {
			t.ok(result, 'this should be called' );
			t.end();
		}
	}})
	var fs2 = require('fs'); 
	t.notEqual(fs , fs2, "should not be the same");
	fs2.test(true);
	
});

test("Requiring overrides multiple times", function (t) { 
	mocking.clear();
	var fs = require('fs');
	 
	mocking.add({name:'fs', result: {
		test: function (result) {
			t.ok(result, 'this should be called' );
			
		}
	}});
	mocking.add({name:'mocker', result: {
		test: function (result) {
			t.ok(result, 'this should be called as well' );
			t.end();
		}
	}});
	var fs2 = require('fs');  
	fs2.test(true);
	var mock = require('mocker');
	mock.test(true);
	 
});

test("Removing a module", function (t) { 
	
	mocking.clear();
	mocking.add({name:'fs', result: {
		mockFunction: function (result) {
			t.ok(result, 'this should be called' );
			
		}
	}});
	var fsMock = require('fs');  
	fsMock.mockFunction(true);
	mocking.remove('fs');
	
	var realFs = require('fs');
	
	t.ok(realFs.mockFunction === undefined);
	t.end();
	 
});