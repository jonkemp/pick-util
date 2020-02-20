const assert = require('assert');
const pick = require('./');

const isNumber = obj => toString.call(obj) === '[object Number]';

describe('pick', () => {
	it('should look through the list and return a copy of the object only containing the whitelisted properties', () => {
		assert.deepEqual(pick({ 'a': 1, 'b': '2', 'c': 3 }, ['a', 'c']), { 'a': 1, 'c': 3 });
		assert.deepEqual(pick({name: 'moe', age: 50, userid: 'moe1'}, 'name', 'age'), { name: 'moe', age: 50 });
		assert.deepEqual(pick({name: 'moe', age: 50, userid: 'moe1'}, (value) => isNumber(value)), { age: 50 });
	});
});
