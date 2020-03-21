const assert = require('assert');
const pick = require('./');

const isNumber = obj => toString.call(obj) === '[object Number]';

const has = (obj, path) => obj != null && Object.prototype.hasOwnProperty.call(obj, path);

const hasProperty = (obj, path) => {
	if (!Array.isArray(path)) {
		return has(obj, path);
	}
	const { length } = path;

	for (let i = 0; i < length; i++) {
		const key = path[i];

		if (obj == null || !Object.prototype.hasOwnProperty.call(obj, key)) {
			return false;
		}
		obj = obj[key];
	}

	return !!length;
};

const constant = value => () => value;

describe('pick', () => {
	it('should look through the list and return a copy of the object only containing the whitelisted properties', () => {
		assert.deepEqual(pick({ 'a': 1, 'b': '2', 'c': 3 }, ['a', 'c']), { 'a': 1, 'c': 3 });
		assert.deepEqual(pick({name: 'moe', age: 50, userid: 'moe1'}, 'name', 'age'), { name: 'moe', age: 50 });
		assert.deepEqual(pick({name: 'moe', age: 50, userid: 'moe1'}, (value) => isNumber(value)), { age: 50 });
	});

	it('can restrict properties to those named', () => {
		const result = pick({a: 1, b: 2, c: 3}, 'a', 'c');

		assert.deepEqual(result, {a: 1, c: 3});
	});

	it('can restrict properties to those named in an array', () => {
		const result = pick({a: 1, b: 2, c: 3}, ['b', 'c']);

		assert.deepEqual(result, {b: 2, c: 3});
	});

	it('can restrict properties to those named in mixed args', () => {
		const result = pick({a: 1, b: 2, c: 3}, ['a'], 'b');

		assert.deepEqual(result, {a: 1, b: 2});
	});

	it('can pick numeric properties', () => {
		const result = pick(['a', 'b'], 1);

		assert.deepEqual(result, {1: 'b'});
	});

	it('should handle null/undefined', () => {
		[null, void 0].forEach(val => {
			assert.deepEqual(pick(val, 'hasOwnProperty'), {});
			assert.deepEqual(pick(val, constant(true)), {});
		});
	});

	it('can iterate primitives', () => {
		assert.deepEqual(pick(5, 'toString', 'b'), {toString: Number.prototype.toString});
	});

	it('can accept a predicate and context', () => {
		const data = {a: 1, b: 2, c: 3};
		const callback = function(value, key, object) {	// eslint-disable-line
			assert.strictEqual(key, {1: 'a', 2: 'b', 3: 'c'}[value]);
			assert.strictEqual(object, data);

			return value !== this.value;
		};
		const result = pick(data, callback, {value: 2});

		assert.deepEqual(result, {a: 1, c: 3});
	});

	it('should include prototype props', () => {
		const Obj = function() {};	// eslint-disable-line

		Obj.prototype = {a: 1, b: 2, c: 3};
		const instance = new Obj();

		assert.deepEqual(pick(instance, 'a', 'c'), {a: 1, c: 3});

		const data = {a: 1, b: 2, c: 3};

		assert.deepEqual(pick(data, function(val, key) {
			return this[key] === 3 && this === instance;
		}, instance), {c: 3});
	});

	it('does not set own property if property not in object', () => {
		assert.ok(!hasProperty(pick({}, 'foo'), 'foo'));
	});

	it('passes same object as third parameter of iteratee', () => {
		const data = {a: 1, b: 2, c: 3};

		pick(data, (value, key, obj) => {
			assert.strictEqual(obj, data);
		});
	});
});
