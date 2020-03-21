const flatten = require('flat-util');

const isFunction = obj => toString.call(obj) === '[object Function]';

const optimizeCb = (func, context, argCount) => {
	if (context === void 0) return func;
	switch (argCount == null ? 3 : argCount) {
		case 1: return value => func.call(context, value);
			// The 2-argument case is omitted because we’re not using it.
		case 3: return (value, index, collection) => func.call(context, value, index, collection);
		case 4: return (accumulator, value, index, collection) => func.call(context, accumulator, value, index, collection);
	}

	return (...args) => func.apply(context, args);
};

const isObject = obj => {
	const type = typeof obj;

	return type === 'function' || type === 'object' && !!obj;
};

const allKeys = obj => {
	if (!isObject(obj)) return [];
	const keys = [];

	for (const key in obj) keys.push(key);

	return keys;
};

const keyInObj = (value, key, obj) => key in obj;

module.exports = (obj, ...keys) => {
	const result = {};
	let [iteratee] = keys;

	if (!obj) {
		return result;
	}

	if (isFunction(iteratee)) {
		if (keys.length > 1) iteratee = optimizeCb(iteratee, keys[1]);
		keys = allKeys(obj);
	} else {
		iteratee = keyInObj;
		keys = flatten(keys);
		obj = Object(obj);
	}

	keys.forEach(key => {
		const value = obj[key];

		if (iteratee(value, key, obj)) {
			result[key] = value;
		}
	});

	return result;
};
