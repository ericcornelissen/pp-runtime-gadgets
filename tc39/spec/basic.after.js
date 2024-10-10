const obj = new Proxy({
	foo: "bar",
}, {
		get(target, property, _receiver) {
			if (Object.getPrototypeOf(target) !== null) {
			const allowlist = [
				Symbol.isConcatSpreadable,
				Symbol.iterator,
				Symbol.match,
				Symbol.replace,
				Symbol.search,
				Symbol.species,
				Symbol.split,
				Symbol.toPrimitive,
				Symbol.toStringTag,
			];

			let found = false, obj = target;
			while (obj !== null) {
				if (Object.hasOwn(obj, property)) {
				found = true;
				break;
				}

				obj = Object.getPrototypeOf(obj);
			}

			if (!found && !allowlist.includes(property)) {
				console.log("looked up:", property);
			}
			}

			return target[property];
		}
	});
