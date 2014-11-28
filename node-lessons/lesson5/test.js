var main = require('./app');
var should = require('should');

describe('test.js', function(){
	it('should equal 55 when n === 10', function(){
		main.fibonacci(10).should.equal(55);
	});
})
describe('test.js', function(){
	it('should equal 0 when n === 0', function(){
		main.fibonacci(0).should.equal(0);
	})
})
describe('test.js', function(){
	it('should equal 1 when n === 1', function(){
		main.fibonacci(1).should.equal(1);
	})
})
describe('test.js', function(){
	it('should throw when n < 0', function(){
		(function(){main.fibonacci(-1)}).should.throw('n should > 0');
	})
})
describe('test.js', function(){
	it('should should throw when n isnt number', function(){
		(function(){main.fibonacci('hehe')}).should.throw('n isnt number');
	})
})
describe('test.js', function(){
	it('should great than 10 when n === 10', function(){
		main.fibonacci(10).should.above(0);
	})
})
