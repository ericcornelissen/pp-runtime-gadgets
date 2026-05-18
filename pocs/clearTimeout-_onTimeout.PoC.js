// SPDX-License-Identifier: BlueOak-1.0.0

export const about = {
	function: "clearTimeout()",
	link: "https://developer.mozilla.org/en-US/docs/Web/API/Window/clearTimeout",
	properties: ["'_onTimeout'"],
	description: `
When a new clearTimeout is called its argument may be an object, in which case
the '_onTimeout' property is reset, which is used internally. This causes an
error if the argument is not an object.`,
};

export function prerequisite() {
  try {
    clearTimeout(1);
  } catch (error) {
    return [false, `got error: ${error.message}`];
  }

  return [true, null];
}

export function test() {
	Object.prototype._onTimeout = "anything";

	try {
    clearTimeout(1);
  } catch {
    return true;
  }

  return false;
}

export function cleanup() {
	delete Object.prototype._onTimeout;
}

export function score() {
	return [
		// none
	];
}
