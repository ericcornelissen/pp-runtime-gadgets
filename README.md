<!-- SPDX-License-Identifier: CC-BY-4.0 -->

# Prototype Pollution affects the JavaScript Runtime

This repository aims to provide a list of JavaScript language functionality that
can be affected by prototype pollution.

## TODO

- Continue in the [spec], currently at `Get(` 38/160.
- Replicate gadgets from `Object.defineProperty` with `Object.defineProperties`.
- Replicate `Reflect.ownKeys`' gadget with other uses of `[[OwnPropertyKeys]]`.

## Reproduce

To reproduce the results:

- for Node.js: `make test-node` (or `make test-node-docker`)
- for Deno: `make test-deno` (or `make test-deno-docker`)
- for Browsers: `make test-web` and open <http://localhost:8080> in a browser.

## Overview

The table below provides an overview of known functions affected by prototype
pollution in the JavaScript language, or _gadgets_. This list is not exhaustive
both in terms of affected APIs and usable properties.

We indicate what kind of pollution is required to use the gadgets. This helps
indicate how easy it is to exploit a given gadget because data only attacks are
easier in practice.

- `1`: _Data_ - Gadget that work when polluting with data only.
- `2`: _Function_ - Gadget that require polluting with a function.
- `3`: _Function/DoS_ - Gadget that require polluting with a function, but
  polluting with a value will cause an exception.

We try to categorize the gadgets into types. These types are very subjective and
mostly try to give an indication of how problematic the gadget is in terms of
language design.

- `1`: _Language_ - Gadgets that occur because of the language design.
- `2`: _User provided object_ - Gadgets that occur because a user provided
  object is used.
- `3`: _Faulty implementation_ - Gadgets that occur because a user uses an
  object that is implemented incorrectly.

All gadgets were tested on Node.js v22.7.0, Deno v1.46.1, Chromium (Desktop)
v129, and Firefox (Desktop) v131.

| API                                 | Prop(s)                               | Level | Type | Node.js | Deno           | Chromium      | Firefox       |
| ----------------------------------- | ------------------------------------- | ----- | ---- | ------- | -------------- | ------------- | ------------- |
| `[[ToPrimitive]]`                   | [`'toString'`][o0002]                 | `3`   | `1`  | Yes     | Yes            | Yes           | Yes           |
|                                     | [`'valueOf'`][o0003]                  | `2`   | `1`  | Yes     | Yes            | Yes           | Yes           |
| `new ArrayBuffer`                   | [`'maxByteLength'`][o0004]            | `1`   | `2`  | Yes     | Yes            | Yes           | Yes           |
| `Array.from`                        | [`<n>`][o0044]                        | `1`   | `3`  | Yes     | Yes            | Yes           | Yes           |
| `Array.prototype.at`                | [`<n>`][o0046]                        | `1`   | `1`  | Yes     | Yes            | Yes           | Yes           |
| `Array.prototype.copyWithin`        | [`<n>`][o0077]                        | `1`   | `1`  | Yes     | Yes            | Yes           | Yes           |
| `Array.prototype.every`             | [`<n>`][o0073]                        | `1`   | `1`  | Yes     | Yes            | Yes           | Yes           |
| `Array.prototype.fill`              | [`<n>`][o0054]                        | `1`   | `1`  | Yes     | Yes            | Yes           | Yes           |
| `Array.prototype.filter`            | [`<n>`][o0072]                        | `1`   | `1`  | Yes     | Yes            | Yes           | Yes           |
| `Array.prototype.find`              | [`<n>`][o0051]                        | `1`   | `1`  | Yes     | Yes            | Yes           | Yes           |
| `Array.prototype.findIndex`         | [`<n>`][o0048]                        | `1`   | `1`  | Yes     | Yes            | Yes           | Yes           |
| `Array.prototype.findLast`          | [`<n>`][o0050]                        | `1`   | `1`  | Yes     | Yes            | Yes           | Yes           |
| `Array.prototype.findLastIndex`     | [`<n>`][o0055]                        | `1`   | `1`  | Yes     | Yes            | Yes           | Yes           |
| `Array.prototype.includes`          | [`<n>`][o0058]                        | `1`   | `1`  | Yes     | Yes            | Yes           | Yes           |
| `Array.prototype.join`              | [`<n>`][o0052]                        | `1`   | `1`  | Yes     | Yes            | Yes           | Yes           |
| `Array.prototype.pop`               | [`<n>`][o0049]                        | `1`   | `3`  | Yes     | Yes            | Yes           | Yes           |
| `Array.prototype.reduce`            | [`<n>`][o0070]                        | `1`   | `1`  | Yes     | Yes            | Yes           | Yes           |
| `Array.prototype.reduceRight`       | [`<n>`][o0074]                        | `1`   | `1`  | Yes     | Yes            | Yes           | Yes           |
| `Array.prototype.shift`             | [`<n>`][o0056]                        | `1`   | `3`  | Yes     | Yes            | Yes           | Yes           |
| `Array.prototype.some`              | [`<n>`][o0071]                        | `1`   | `1`  | Yes     | Yes            | Yes           | Yes           |
| `Array.prototype.sort`              | [`<n>`][o0057]                        | `1`   | `1`  | Yes     | Yes            | Yes           | Yes           |
| `Array.prototype.splice`            | [`<n>`][o0076]                        | `1`   | `1`  | Yes     | Yes            | Yes           | Yes           |
| `Array.prototype.toReversed`        | [`<n>`][o0047]                        | `1`   | `1`  | Yes     | Yes            | Yes           | Yes           |
| `Array.prototype.toSorted`          | [`<n>`][o0059]                        | `1`   | `1`  | Yes     | Yes            | Yes           | Yes           |
| `Array.prototype.toSpliced`         | [`<n>`][o0053]                        | `1`   | `1`  | Yes     | Yes            | Yes           | Yes           |
| `Array.prototype.with`              | [`<n>`][o0045]                        | `1`   | `1`  | Yes     | Yes            | Yes           | Yes           |
| `Function.prototype.apply`          | [`<n>`][o0005]                        | `1`   | `3`  | Yes     | Yes            | Yes           | Yes           |
| `Iterator`                          | [`'done'`][o0032]                     | `3`   | `1`  | Yes     | Yes            | Yes           | Yes           |
|                                     | [`'next'`][o0006]                     | `3`   | `3`  | Yes     | Yes            | Yes           | Yes           |
|                                     | [`'return'`][o0064]                   | `3`   | `3`  | Yes     | Yes            | Yes           | Yes           |
|                                     | [`'value'`][o0033]                    | `3`   | `1`  | Yes     | Yes            | Yes           | Yes           |
| `JSON.stringify`                    | [`'toJSON'`][o0025]                   | `2`   | `1`  | Yes     | Yes            | Yes           | Yes           |
| `Object.defineProperty`             | [`'configurable'`][o0007]             | `1`   | `2`  | Yes     | Yes            | Yes           | Yes           |
|                                     | [`'enumerable'`][o0008]               | `1`   | `2`  | Yes     | Yes            | Yes           | Yes           |
|                                     | [`'get'`][o0009]                      | `3`   | `2`  | Yes     | Yes            | Yes           | Yes           |
|                                     | [`'set'`][o0010]                      | `3`   | `2`  | Yes     | Yes            | Yes           | Yes           |
|                                     | [`'value'`][o0011]                    | `1`   | `2`  | Yes     | Yes            | Yes           | Yes           |
|                                     | [`'writable'`][o0012]                 | `1`   | `2`  | Yes     | Yes            | Yes           | Yes           |
| `Object.entries`                    | [`'enumerable'`][o0013]               | `1`   | `3`  | Yes     | Yes            | Yes           | Yes           |
| `Object.fromEntries`                | [`0,1`][o0014]                        | `1`   | `1`  | Yes     | Yes            | Yes           | Yes           |
| `Object.keys`                       | [`'enumerable'`][o0015]               | `1`   | `3`  | Yes     | Yes            | Yes           | Yes           |
| `Object.prototype.toString`         | [`@@toStringTag`][o0034]              | `1`   | `3`  | Yes     | Yes            | Yes           | Yes           |
| `Object.values`                     | [`'enumerable'`][o0016]               | `1`   | `3`  | Yes     | Yes            | Yes           | Yes           |
| `new Proxy`                         | [`'apply'`][o0040]                    | `3`   | `2`  | Yes     | Yes            | Yes           | Yes           |
|                                     | [`'construct'`][o0065]                | `3`   | `2`  | Yes     | Yes            | Yes           | Yes           |
|                                     | [`'defineProperty'`][o0067]           | `3`   | `2`  | Yes     | Yes            | Yes           | Yes           |
|                                     | [`'deleteProperty'`][o0041]           | `3`   | `2`  | Yes     | Yes            | Yes           | Yes           |
|                                     | [`'getOwnPropertyDescriptor'`][o0038] | `3`   | `2`  | Yes     | Yes            | Yes           | Yes           |
|                                     | [`'isExtensible'`][o0042]             | `3`   | `2`  | Yes     | Yes            | Yes           | Yes           |
|                                     | [`'ownKeys'`][o0037]                  | `3`   | `2`  | Yes     | Yes            | Yes           | Yes           |
|                                     | [`'preventExtensions'`][o0069]        | `3`   | `2`  | Yes     | Yes            | Yes           | Yes           |
|                                     | [`'set'`][o0036]                      | `3`   | `2`  | Yes     | Yes            | Yes           | Yes           |
|                                     | [`'setPrototypeOf'`][o0075]           | `3`   | `2`  | Yes     | Yes            | Yes           | Yes           |
| `Reflect.apply`                     | [`<n>`][o0017]                        | `1`   | `3`  | Yes     | Yes            | Yes           | Yes           |
| `Reflect.construct`                 | [`<n>`][o0018]                        | `1`   | `3`  | Yes     | Yes            | Yes           | Yes           |
| `Reflect.defineProperty`            | [`'configurable'`][o0026]             | `1`   | `2`  | Yes     | Yes            | Yes           | Yes           |
|                                     | [`'enumerable'`][o0027]               | `1`   | `2`  | Yes     | Yes            | Yes           | Yes           |
|                                     | [`'get'`][o0028]                      | `3`   | `2`  | Yes     | Yes            | Yes           | Yes           |
|                                     | [`'set'`][o0029]                      | `3`   | `2`  | Yes     | Yes            | Yes           | Yes           |
|                                     | [`'value'`][o0030]                    | `1`   | `2`  | Yes     | Yes            | Yes           | Yes           |
|                                     | [`'writable'`][o0031]                 | `1`   | `2`  | Yes     | Yes            | Yes           | Yes           |
| `Reflect.ownKeys`                   | [`<n>`][o0001]                        | `1`   | `3`  | Yes     | Yes            | Yes           | Yes           |
| `new RegExp`                        | [`'source'`][o0039]                   | `1`   | `3`  | Yes     | Yes            | Yes           | Yes           |
| `RegExp.prototype[@@match]`         | [`'exec'`][o0066]                     | `3`   | `3`  | Yes     | Yes            | Yes           | Yes           |
| `new SharedArrayBuffer`             | [`'maxByteLength'`][o0019]            | `1`   | `2`  | Yes     | Yes            | _Unsupported_ | _Unsupported_ |
| `Set.prototype.difference`          | [`'has','size'`][o0063]               | `3`   | `2`  | Yes     | Yes            | Yes           | Yes           |
| `Set.prototype.intersection`        | [`'has','size'`][o0061]               | `3`   | `2`  | Yes     | Yes            | Yes           | Yes           |
| `Set.prototype.isDisjointFrom`      | [`'has','size'`][o0062]               | `3`   | `2`  | Yes     | Yes            | Yes           | Yes           |
| `Set.prototype.symmetricDifference` | [`'has','size'`][o0060]               | `3`   | `2`  | Yes     | Yes            | Yes           | Yes           |
| `Set.prototype.union`               | [`'has','size'`][o0035]               | `3`   | `2`  | Yes     | Yes            | Yes           | Yes           |
| `String.prototype.endsWith`         | [`@@match`][o0020]                    | `1`   | `2`  | Yes     | Yes            | Yes           | Yes           |
| `String.prototype.includes`         | [`@@match`][o0021]                    | `1`   | `2`  | Yes     | Yes            | Yes           | Yes           |
| `String.prototype.matchAll`         | [`@@match,@@matchAll,'flags'`][o0022] | `3`   | `2`  | Yes     | Yes            | Yes           | Yes           |
| `String.prototype.replaceAll`       | [`@@match,@@replace,'flags'`][o0023]  | `3`   | `2`  | Yes     | Yes            | Yes           | Yes           |
| `String.prototype.startsWith`       | [`@@match`][o0024]                    | `1`   | `2`  | Yes     | Yes            | Yes           | Yes           |
| `TypedArray`                        | [`<n>`][o0068]                        | `1`   | `3`  | Yes     | Yes            | Yes           | Yes           |
| `with`                              | [`@@unscopables`][o0043]              | `1`   | `1`  | Yes     | _Unsupported_  | _Not tested_  | _Not tested_  |

where:

- `/[0-9]+/`: is a specific numeric property.
- `/'.+?'/`: is a specific string property.
- `/@@.+?/`: is a specific [well-known symbol].
- `<n>`: is any numeric property.
- `<k>`: is any property.

[o0001]: ./pocs/[[OwnPropertyKeys]]-<n>.PoC.js
[o0002]: ./pocs/[[ToPrimitive]]-toString.PoC.js
[o0003]: ./pocs/[[ToPrimitive]]-valueOf.PoC.js
[o0004]: ./pocs/ArrayBuffer-maxByteLength.PoC.js
[o0005]: ./pocs/FunctionPrototypeApply-<n>.PoC.js
[o0006]: ./pocs/Iterator-next.PoC.js
[o0007]: ./pocs/ObjectDefineProperty-configurable.PoC.js
[o0008]: ./pocs/ObjectDefineProperty-enumerable.PoC.js
[o0009]: ./pocs/ObjectDefineProperty-get.PoC.js
[o0010]: ./pocs/ObjectDefineProperty-set.PoC.js
[o0011]: ./pocs/ObjectDefineProperty-value.PoC.js
[o0012]: ./pocs/ObjectDefineProperty-writable.PoC.js
[o0013]: ./pocs/ObjectEntries-enumerable.PoC.js
[o0014]: ./pocs/ObjectFromEntries-0,1.PoC.js
[o0015]: ./pocs/ObjectKeys-enumerable.PoC.js
[o0016]: ./pocs/ObjectValues-enumerable.PoC.js
[o0017]: ./pocs/ReflectApply-<n>.PoC.js
[o0018]: ./pocs/ReflectConstruct-<n>.PoC.js
[o0019]: ./pocs/SharedArrayBuffer-maxByteLength.PoC.js
[o0020]: ./pocs/StringPrototypeEndsWith-@@match.PoC.js
[o0021]: ./pocs/StringPrototypeIncludes-@@match.PoC.js
[o0022]: ./pocs/StringPrototypeMatchAll-@@match,@@matchAll,flag.PoC.js
[o0023]: ./pocs/StringPrototypeReplaceAll-@@match,@@replace,flag.PoC.js
[o0024]: ./pocs/StringPrototypeStartsWith-@@match.PoC.js
[o0025]: ./pocs/JSONStringify-toJSON.PoC.js
[o0026]: ./pocs/ReflectDefineProperty-configurable.PoC.js
[o0027]: ./pocs/ReflectDefineProperty-enumerable.PoC.js
[o0028]: ./pocs/ReflectDefineProperty-get.PoC.js
[o0029]: ./pocs/ReflectDefineProperty-set.PoC.js
[o0030]: ./pocs/ReflectDefineProperty-value.PoC.js
[o0031]: ./pocs/ReflectDefineProperty-writable.PoC.js
[o0032]: ./pocs/Iterator-done.PoC.js
[o0033]: ./pocs/Iterator-value.PoC.js
[o0034]: ./pocs/ObjectToString-@@toStringTag.PoC.js
[o0035]: ./pocs/SetPrototypeUnion-has,size.PoC.js
[o0036]: ./pocs/Proxy-set.PoC.js
[o0037]: ./pocs/Proxy-ownKeys.PoC.js
[o0038]: ./pocs/Proxy-getOwnPropertyDescriptor.PoC.js
[o0039]: ./pocs/RegExp-source.PoC.js
[o0040]: ./pocs/Proxy-apply.PoC.js
[o0041]: ./pocs/Proxy-deleteProperty.PoC.js
[o0042]: ./pocs/Proxy-isExtensible.PoC.js
[o0043]: ./pocs/with-@@unscopables.PoC.cjs
[o0044]: ./pocs/ArrayFrom-<n>.PoC.js
[o0045]: ./pocs/ArrayPrototypeWith-<n>.PoC.js
[o0046]: ./pocs/ArrayPrototypeAt-<n>.PoC.js
[o0047]: ./pocs/ArrayPrototypeToReversed-<n>.PoC.js
[o0048]: ./pocs/ArrayPrototypeFindIndex-<n>.PoC.js
[o0049]: ./pocs/ArrayPrototypePop-<n>.PoC.js
[o0050]: ./pocs/ArrayPrototypeFindLast-<n>.PoC.js
[o0051]: ./pocs/ArrayPrototypeFind-<n>.PoC.js
[o0052]: ./pocs/ArrayPrototypeJoin-<n>.PoC.js
[o0053]: ./pocs/ArrayPrototypeToSpliced-<n>.PoC.js
[o0054]: ./pocs/ArrayPrototypeFill-<n>.PoC.js
[o0055]: ./pocs/ArrayPrototypeFindLastIndex-<n>.PoC.js
[o0056]: ./pocs/ArrayPrototypeShift-<n>.PoC.js
[o0057]: ./pocs/ArrayPrototypeSort-<n>.PoC.js
[o0058]: ./pocs/ArrayPrototypeIncludes-<n>.PoC.js
[o0059]: ./pocs/ArrayPrototypeToSorted-<n>.PoC.js
[o0060]: ./pocs/SetPrototypeSymmetricDifference-has,size.PoC.js
[o0061]: ./pocs/SetPrototypeIntersection-has,size.PoC.js
[o0062]: ./pocs/SetPrototypeIsDisjointFrom-has,size.PoC.js
[o0063]: ./pocs/SetPrototypeDifference-has,size.PoC.js
[o0064]: ./pocs/Iterator-return.PoC.js
[o0065]: ./pocs/Proxy-construct.PoC.js
[o0066]: ./pocs/RegExpPrototype@@match-exec.PoC.js
[o0067]: ./pocs/Proxy-defineProperty.PoC.js
[o0068]: ./pocs/TypedArrayFrom-<n>.PoC.js
[o0069]: ./pocs/Proxy-preventExtensions.PoC.js
[o0070]: ./pocs/ArrayPrototypeReduce-<n>.PoC.js
[o0071]: ./pocs/ArrayPrototypeSome-<n>.PoC.js
[o0072]: ./pocs/ArrayPrototypeFilter-<n>.PoC.js
[o0073]: ./pocs/ArrayPrototypeEvery-<n>.PoC.js
[o0074]: ./pocs/ArrayPrototypeReduceRight-<n>.PoC.js
[o0075]: ./pocs/Proxy-setPrototypeOf.PoC.js
[o0076]: ./pocs/ArrayPrototypeSplice-<n>.PoC.js
[o0077]: ./pocs/ArrayPrototypeCopyWithin-<n>.PoC.js

## Unaffected

The table below lists evaluated sections in the ECMAScript spec which were
deemed unaffected by prototype pollution.

| API                                    | Property        | Reason                                                                                                              |
| -------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------- |
| [`CopyDataProperties`][i0001]          | `<k>`           | Implementation should `ToObject` the subject, hence all own keys are actually own keys.                             |
| [`OrdinaryHasInstance`][i0002]         | `'prototype'`   | Object on which lookup should happen must be a callable, which means it must have a `prototype` property.           |
| [`HasBinding`][i0003]                  | `@@unscopable`  | _Not evaluated_                                                                                                     |
|                                        | `<n>`           | _Not evaluated_                                                                                                     |
| [`GetBindingValue`][i0004]             | `<n>`           | Checks `HasProperty` before `Get`.                                                                                  |
| [`GetPrototypeFromConstructor`][i0005] | `'prototype'`   | Object on which lookup should happen must be a callable, which means it must have a `prototype` property.           |
| [`ArraySpeciesCreate`][i0006]          | `'constructor'` | Object on which lookup should happen must be an array, which means it must have a `constructor` property.           |
|                                        | `@@species`     | Object on which lookup should happen must be an array constructor, which means it must have a `@@species` property. |
| [`[[GetOwnProperty]]`][i0007]          | `<k>`           | _Not evaluated_                                                                                                     |
| [`[[DefineOwnProperty]]`][i0008]       | `<k>`           | _Not evaluated_                                                                                                     |
| [`[[Get]]`][i0009]                     | `<k>`           | _Not evaluated_                                                                                                     |
| [`Object.assign`][i0010]               | `<k>`           | Will only access keys in the `[[OwnPropertyKeys]]` set.                                                             |
| [`ObjectDefineProperties`][i0011]      | `<k>`           | Will only access keys in the `[[OwnPropertyKeys]]` set.                                                             |
| [`RegExp.prototype.toString`][i0012]   | `'source'`      | `this` will realistically only be an instance of RegExp, in which case `source` is always defined.                  |

[i0001]: https://tc39.es/ecma262/#sec-copydataproperties
[i0002]: https://tc39.es/ecma262/#sec-ordinaryhasinstance
[i0003]: https://tc39.es/ecma262/#sec-object-environment-records-hasbinding-n
[i0004]: https://tc39.es/ecma262/#sec-object-environment-records-getbindingvalue-n-s
[i0005]: https://tc39.es/ecma262/#sec-getprototypefromconstructor
[i0006]: https://tc39.es/ecma262/#sec-arrayspeciescreate
[i0007]: https://tc39.es/ecma262/#sec-arguments-exotic-objects-getownproperty-p
[i0008]: https://tc39.es/ecma262/#sec-arguments-exotic-objects-defineownproperty-p-desc
[i0009]: https://tc39.es/ecma262/#sec-arguments-exotic-objects-get-p-receiver
[i0010]: https://tc39.es/ecma262/#sec-object.assign
[i0011]: https://tc39.es/ecma262/#sec-objectdefineproperties
[i0012]: https://tc39.es/ecma262/#sec-regexp.prototype.tostring

## Approach

So far this overview has been created manually by inspecting the ECMAScript spec
looking for use of the `Get(O, P)` function. This function gets property `P`
from object `O`, hence if `P` is missing from `O` the lookup could be affected
by prototype pollution.

Additionally, during testing a proxy object like the one shown below is used to
find out what properties are being looked up exactly.

```javascript
const proxy = new Proxy({}, {
  get(target, property, _receiver) {
   if (!Object.hasOwn(target, property)) {
    console.log("looked up:", property);
   }

   return target[property];
  },
});
```

## Related Work

- [GHunter: Universal Prototype Pollution Gadgets in JavaScript Runtimes](https://www.usenix.org/conference/usenixsecurity24/presentation/cornelissen)

  Toolchain to find prototype pollution gadgets in the Node.js runtime. It
  cannot find the gadgets described in this repository because they're not
  covered by the binding code.

- [Silent Spring: Prototype Pollution Leads to Remote Code Execution in Node.js](https://www.usenix.org/conference/usenixsecurity23/presentation/shcherbakov)

  Toolchain to find prototype pollution and gadgets in libraries and the Node.js
  runtime. It cannot find the gadgets described in this repository because it
  cannot statically analyze built-in functionality.

[spec]: https://tc39.es/ecma262 "ECMAScript Language Specification"
[well-known symbol]: https://tc39.es/ecma262/#sec-well-known-symbols "ECMAScript Well-Known Symbols"
