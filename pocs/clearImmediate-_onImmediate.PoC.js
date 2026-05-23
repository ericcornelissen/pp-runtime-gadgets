// SPDX-License-Identifier: BlueOak-1.0.0

export const about = {
	function: "clearImmediate()",
	link: "https://developer.mozilla.org/en-US/docs/Web/API/Window/clearImmediate",
	properties: ["'_onImmediate'"],
	description: `
When a new clearImmediate is called its argument may be an object, in which case
the '_onImmediate' property is reset, which is used internally. This causes an
error if the argument is not an object.`,
};

export function prerequisite() {
  try {
    clearImmediate(1);
  } catch (error) {
    return [false, `got error: ${error.message}`];
  }

  return [true, null];
}

export function test() {
	Object.prototype._onImmediate = "anything";

	try {
    clearImmediate(1);
  } catch {
    return true;
  }

  return false;
}

export function cleanup() {
	delete Object.prototype._onImmediate;
}

export function score() {
	return [
		// none
	];
}
