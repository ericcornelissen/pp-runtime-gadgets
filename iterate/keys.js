// SPDX-License-Identifier: BlueOak-1.0.0

const noKeys = new Set();

export function asManyKeysAsPossible(obj) {
	if (obj === undefined || obj === null) {
		return noKeys;
	}

	if (
		typeof obj === "boolean" ||
		typeof obj === "number" ||
		typeof obj === "string"
	) {
		obj = Object.getPrototypeOf(obj);
	}

	return new Set([
		...objectKeys(obj),
		// ...objectGetOwnPropertyNames(obj),
		// ...objectGetOwnPropertySymbols(obj),
		// ...objectGetOwnPropertyDescriptors(obj),
		// ...reflectOwnKeys(obj),
		...forIn(obj),
		// ...objectAssign(obj),
		// ...objectSpread(obj),
	]);
}

function objectKeys(obj) {
	return Object.keys(obj);
}

function objectGetOwnPropertyNames(obj) {
	return Object.getOwnPropertyNames(obj);
}

function objectGetOwnPropertySymbols(obj) {
	return Object.getOwnPropertySymbols(obj);
}

function objectGetOwnPropertyDescriptors(obj) {
	const tmp = Object.getOwnPropertyDescriptors(obj);
	return Object.keys(tmp);
}

function reflectOwnKeys(obj) {
	return Reflect.ownKeys(obj);
}

function forIn(obj) {
	const keys = new Set();
	for (const key in obj) {
		keys.add(key)
	}

	return keys;
}

function objectAssign(obj) {
	const target = Object.create(null);
	const source = obj;
	const tmp = Object.assign(target, source);
	return Object.keys(tmp);
}

function objectSpread(obj) {
	const tmp = { ...obj };
	return Object.keys(tmp);
}
