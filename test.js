const assert = require('assert');
const pick = require('./');

describe('pick', () => {
	it('should look through the list and return a copy of the object only containing the whitelisted properties', () => {
		assert.deepEqual(pick({ 'a': 1, 'b': '2', 'c': 3 }, 'a', 'c'), { 'a': 1, 'c': 3 });
		assert.deepEqual(pick({ 'user': 'barney',  'age': 36, 'active': true }, ['user', 'active']), { 'user': 'barney', 'active': true });
	});
});
