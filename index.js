const flatten = require('flat-util');

const isFunction = obj => toString.call(obj) === '[object Function]';

const keyInObj = (value, key, obj) => key in obj;

module.exports = (obj, ...keys) => {
	const result = {};
	let iteratee = keys[0];

	if (!obj) {
		return result;
	}

	if (isFunction(iteratee)) {
		keys = Object.keys(obj);
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
