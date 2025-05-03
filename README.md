<!-- SPDX-License-Identifier: CC-BY-4.0 -->

# Prototype Pollution affects the JavaScript Runtime

This repository aims to provide a list of JavaScript language functionality that
can be affected by prototype pollution.

## TODO

- [x] Manually check all 160 `Get(` in the [fixed spec reference].
- [ ] Double check all 160 `Get(` in the [fixed spec reference].
- [ ] Manually check other `Get(`-like functions in the [fixed spec reference].
- [ ] Replicate gadgets from `Object.defineProperty` with
      `Object.defineProperties`.
- [ ] Replicate `Reflect.ownKeys`' gadget with other uses of
      `[[OwnPropertyKeys]]`.
- [ ] Similar gadgets to those for `RegExp.prototype[@@match]` and
      `RegExp.prototype[@@matchAll]` in other `RegExp.prototype` functions.

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
v136, and Firefox (Desktop) v138.

Notes:

- `Array.prototype[*]` gadgets generally should also work on their TypedArray
  equivalent.
- `Iterator[*]` gadgets generally should also work on their async equivalent.

| API                                 | Prop(s)                               | Level | Type | Node.js | Deno           | Chromium      | Firefox       |
| ----------------------------------- | ------------------------------------- | ----- | ---- | ------- | -------------- | ------------- | ------------- |
| `[[ToPrimitive]]`                   | [`'toString'`][o0002]                 | `3`   | `1`  | Yes     | Yes            | Yes           | Yes           |
|                                     | [`'valueOf'`][o0003]                  | `2`   | `1`  | Yes     | Yes            | Yes           | Yes           |
| `new AggregateError`                | [`'cause'`][o0080]                    | `1`   | `1`  | Yes     | Yes            | Yes           | Yes           |
| `new ArrayBuffer`                   | [`'maxByteLength'`][o0004]            | `1`   | `2`  | Yes     | Yes            | Yes           | Yes           |
| `Array.from`                        | [`<n>`][o0044]                        | `1`   | `3`  | Yes     | Yes            | Yes           | Yes           |
| `Array.prototype.at`                | [`<n>`][o0046]                        | `1`   | `1`  | Yes     | Yes            | Yes           | Yes           |
| `Array.prototype.concat`            | [`<n>`][o0087]                        | `1`   | `3`  | Yes     | Yes            | Yes           | Yes           |
|                                     | [`@@isConcatSpreadable`][o0088]       | `1`   | `3`  | Yes     | Yes            | Yes           | Yes           |
| `Array.prototype.copyWithin`        | [`<n>`][o0077]                        | `1`   | `1`  | Yes     | Yes            | Yes           | Yes           |
| `Array.prototype.every`             | [`<n>`][o0073]                        | `1`   | `1`  | Yes     | Yes            | Yes           | Yes           |
| `Array.prototype.fill`              | [`<n>`][o0054]                        | `1`   | `1`  | Yes     | Yes            | Yes           | Yes           |
| `Array.prototype.filter`            | [`<n>`][o0072]                        | `1`   | `1`  | Yes     | Yes            | Yes           | Yes           |
| `Array.prototype.find`              | [`<n>`][o0051]                        | `1`   | `1`  | Yes     | Yes            | Yes           | Yes           |
| `Array.prototype.findIndex`         | [`<n>`][o0048]                        | `1`   | `1`  | Yes     | Yes            | Yes           | Yes           |
| `Array.prototype.findLast`          | [`<n>`][o0050]                        | `1`   | `1`  | Yes     | Yes            | Yes           | Yes           |
| `Array.prototype.findLastIndex`     | [`<n>`][o0055]                        | `1`   | `1`  | Yes     | Yes            | Yes           | Yes           |
| `Array.prototype.flat`              | [`<n>`][o0089]                        | `1`   | `1`  | Yes     | Yes            | Yes           | Yes           |
| `Array.prototype.flatMap`           | [`<n>`][o0091]                        | `1`   | `1`  | Yes     | Yes            | Yes           | Yes           |
|                                     | [`<n>`][o0092]                        | `1`   | `1`  | Yes     | Yes            | Yes           | Yes           |
| `Array.prototype.forEach`           | [`<n>`][o0090]                        | `1`   | `1`  | Yes     | Yes            | Yes           | Yes           |
| `Array.prototype.includes`          | [`<n>`][o0058]                        | `1`   | `1`  | Yes     | Yes            | Yes           | Yes           |
| `Array.prototype.indexOf`           | [`<n>`][o0094]                        | `1`   | `1`  | Yes     | Yes            | Yes           | Yes           |
| `Array.prototype.join`              | [`<n>`][o0052]                        | `1`   | `1`  | Yes     | Yes            | Yes           | Yes           |
| `Array.prototype.lastIndexOf`       | [`<n>`][o0095]                        | `1`   | `1`  | Yes     | Yes            | Yes           | Yes           |
| `Array.prototype.map`               | [`<n>`][o0096]                        | `1`   | `1`  | Yes     | Yes            | Yes           | Yes           |
| `Array.prototype.pop`               | [`<n>`][o0049]                        | `1`   | `3`  | Yes     | Yes            | Yes           | Yes           |
| `Array.prototype.reduce`            | [`<n>`][o0070]                        | `1`   | `1`  | Yes     | Yes            | Yes           | Yes           |
|                                     | [`<n>`][o0097]                        | `1`   | `1`  | Yes     | Yes            | Yes           | Yes           |
| `Array.prototype.reduceRight`       | [`<n>`][o0074]                        | `1`   | `1`  | Yes     | Yes            | Yes           | Yes           |
| `Array.prototype.reverse`           | [`<n>`][o0098]                        | `1`   | `1`  | Yes     | Yes            | Yes           | Yes           |
| `Array.prototype.shift`             | [`<n>`][o0099]                        | `1`   | `1`  | Yes     | Yes            | Yes           | Yes           |
|                                     | [`<n>`][o0056]                        | `1`   | `3`  | Yes     | Yes            | Yes           | Yes           |
| `Array.prototype.slice`             | [`<n>`][o0100]                        | `1`   | `1`  | Yes     | Yes            | Yes           | Yes           |
| `Array.prototype.some`              | [`<n>`][o0071]                        | `1`   | `1`  | Yes     | Yes            | Yes           | Yes           |
| `Array.prototype.sort`              | [`<n>`][o0057]                        | `1`   | `1`  | Yes     | Yes            | Yes           | Yes           |
| `Array.prototype.splice`            | [`<n>`][o0076]                        | `1`   | `1`  | Yes     | Yes            | Yes           | Yes           |
|                                     | [`<n>`][o0101]                        | `1`   | `1`  | Yes     | Yes            | Yes           | Yes           |
|                                     | [`<n>`][o0103]                        | `1`   | `1`  | Yes     | Yes            | Yes           | Yes           |
| `Array.prototype.toLocaleString`    | [`<n>`][o0102]                        | `1`   | `1`  | Yes     | Yes            | Yes           | Yes           |
| `Array.prototype.toReversed`        | [`<n>`][o0047]                        | `1`   | `1`  | Yes     | Yes            | Yes           | Yes           |
| `Array.prototype.toSorted`          | [`<n>`][o0059]                        | `1`   | `1`  | Yes     | Yes            | Yes           | Yes           |
| `Array.prototype.toSpliced`         | [`<n>`][o0053]                        | `1`   | `1`  | Yes     | Yes            | Yes           | Yes           |
|                                     | [`<n>`][o0104]                        | `1`   | `1`  | Yes     | Yes            | Yes           | Yes           |
| `Array.prototype.toString`          | [`join`][o0093]                       | `3`   | `3`  | Yes     | Yes            | Yes           | Yes           |
| `Array.prototype.with`              | [`<n>`][o0045]                        | `1`   | `1`  | Yes     | Yes            | Yes           | Yes           |
| `new Error`                         | [`'cause'`][o0079]                    | `1`   | `1`  | Yes     | Yes            | Yes           | Yes           |
| `Function.prototype.apply`          | [`<n>`][o0005]                        | `1`   | `3`  | Yes     | Yes            | Yes           | Yes           |
| `Function.prototype.bind`           | [`'name'`][o0078]                     | `1`   | `3`  | No      | No             | No            | No            |
| `Iterator`                          | [`'done'`][o0032]                     | `3`   | `1`  | Yes     | Yes            | Yes           | Yes           |
|                                     | [`'next'`][o0006]                     | `3`   | `3`  | Yes     | Yes            | Yes           | Yes           |
|                                     | [`'return'`][o0064]                   | `3`   | `3`  | Yes     | Yes            | Yes           | Yes           |
|                                     | [`'value'`][o0033]                    | `3`   | `1`  | Yes     | Yes            | Yes           | Yes           |
| `JSON.stringify`                    | [`<n>`][o0108]                        | `1`   | `1`  | Yes     | Yes            | Yes           | Yes           |
| `JSON.stringify`                    | [`'toJSON'`][o0025]                   | `2`   | `1`  | Yes     | Yes            | Yes           | Yes           |
| `new Map`                           | [`0,1`][o0105]                        | `1`   | `1`  | Yes     | Yes            | Yes           | Yes           |
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
| `RegExp.prototype[@@match]`         | [`0`][o0084]                          | `1`   | `3`  | Yes     | Yes            | Yes           | Yes           |
|                                     | [`'exec'`][o0066]                     | `3`   | `3`  | Yes     | Yes            | Yes           | Yes           |
|                                     | [`'flags'`][o0082]                    | `1`   | `3`  | No      | No             | Yes           | Yes           |
|                                     | [`'global'`][o0083]                   | `1`   | `3`  | Yes     | Yes            | No            | No            |
| `RegExp.prototype[@@matchAll]`      | [`'flags'`][o0086]                    | `1`   | `3`  | Yes     | Yes            | Yes           | Yes           |
|                                     | [`'lastIndex'`][o0085]                | `1`   | `3`  | Yes     | Yes            | Yes           | Yes           |
| `new SharedArrayBuffer`             | [`'maxByteLength'`][o0019]            | `1`   | `2`  | Yes     | Yes            | _Unsupported_ | _Unsupported_ |
| `Set.prototype.difference`          | [`'has','size'`][o0063]               | `3`   | `2`  | Yes     | Yes            | Yes           | Yes           |
| `Set.prototype.intersection`        | [`'has','size'`][o0061]               | `3`   | `2`  | Yes     | Yes            | Yes           | Yes           |
| `Set.prototype.isDisjointFrom`      | [`'has','size'`][o0062]               | `3`   | `2`  | Yes     | Yes            | Yes           | Yes           |
| `Set.prototype.isSubsetOf`          | [`'has','size'`][o0106]               | `3`   | `2`  | Yes     | Yes            | Yes           | Yes           |
| `Set.prototype.isSupersetOf`        | [`'has','size'`][o0107]               | `3`   | `2`  | Yes     | Yes            | Yes           | Yes           |
| `Set.prototype.symmetricDifference` | [`'has','size'`][o0060]               | `3`   | `2`  | Yes     | Yes            | Yes           | Yes           |
| `Set.prototype.union`               | [`'has','size'`][o0035]               | `3`   | `2`  | Yes     | Yes            | Yes           | Yes           |
| `String.prototype.endsWith`         | [`@@match`][o0020]                    | `1`   | `2`  | Yes     | Yes            | Yes           | Yes           |
| `String.prototype.includes`         | [`@@match`][o0021]                    | `1`   | `2`  | Yes     | Yes            | Yes           | Yes           |
| `String.prototype.matchAll`         | [`@@match,@@matchAll,'flags'`][o0022] | `3`   | `2`  | Yes     | Yes            | Yes           | Yes           |
| `String.prototype.replaceAll`       | [`@@match,@@replace,'flags'`][o0023]  | `3`   | `2`  | Yes     | Yes            | Yes           | Yes           |
| `String.prototype.startsWith`       | [`@@match`][o0024]                    | `1`   | `2`  | Yes     | Yes            | Yes           | Yes           |
| `String.raw`                        | [`'raw'`][o0081]                      | `1`   | `3`  | Yes     | Yes            | Yes           | Yes           |
| `TypedArray.from`                   | [`<n>`][o0068]                        | `1`   | `3`  | Yes     | Yes            | Yes           | Yes           |
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
[o0053]: ./pocs/ArrayPrototypeToSpliced-<n>.PoC-1.js
[o0054]: ./pocs/ArrayPrototypeFill-<n>.PoC.js
[o0055]: ./pocs/ArrayPrototypeFindLastIndex-<n>.PoC.js
[o0056]: ./pocs/ArrayPrototypeShift-<n>.PoC-1.js
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
[o0070]: ./pocs/ArrayPrototypeReduce-<n>.PoC-1.js
[o0071]: ./pocs/ArrayPrototypeSome-<n>.PoC.js
[o0072]: ./pocs/ArrayPrototypeFilter-<n>.PoC.js
[o0073]: ./pocs/ArrayPrototypeEvery-<n>.PoC.js
[o0074]: ./pocs/ArrayPrototypeReduceRight-<n>.PoC.js
[o0075]: ./pocs/Proxy-setPrototypeOf.PoC.js
[o0076]: ./pocs/ArrayPrototypeSplice-<n>.PoC-1.js
[o0077]: ./pocs/ArrayPrototypeCopyWithin-<n>.PoC.js
[o0078]: ./pocs/FunctionPrototypeBind-name.PoC.js
[o0079]: ./pocs/Error-cause.PoC.js
[o0080]: ./pocs/AggregateError-cause.PoC.js
[o0081]: ./pocs/StringRaw-raw.PoC.js
[o0082]: ./pocs/RegExpPrototype@@match-flags.PoC.js
[o0083]: ./pocs/RegExpPrototype@@match-global.PoC.js
[o0084]: ./pocs/RegExpPrototype@@match-0.PoC.js
[o0085]: ./pocs/RegExpPrototype@@matchAll-lastIndex.PoC.js
[o0086]: ./pocs/RegExpPrototype@@matchAll-flags.PoC.js
[o0087]: ./pocs/ArrayPrototypeConcat-<n>.PoC.js
[o0088]: ./pocs/ArrayPrototypeConcat-@@isConcatSpreadable.PoC.js
[o0089]: ./pocs/ArrayPrototypeFlat-<n>.PoC.js
[o0090]: ./pocs/ArrayPrototypeForEach-<n>.PoC.js
[o0091]: ./pocs/ArrayPrototypeFlatMap-<n>.PoC-1.js
[o0092]: ./pocs/ArrayPrototypeFlatMap-<n>.PoC-2.js
[o0093]: ./pocs/ArrayPrototypeToString-join.PoC.js
[o0094]: ./pocs/ArrayPrototypeIndexOf-<n>.PoC.js
[o0095]: ./pocs/ArrayPrototypeLastIndexOf-<n>.PoC.js
[o0096]: ./pocs/ArrayPrototypeMap-<n>.PoC.js
[o0097]: ./pocs/ArrayPrototypeReduce-<n>.PoC-2.js
[o0098]: ./pocs/ArrayPrototypeReverse-<n>.PoC.js
[o0099]: ./pocs/ArrayPrototypeShift-<n>.PoC-2.js
[o0100]: ./pocs/ArrayPrototypeSlice-<n>.PoC.js
[o0101]: ./pocs/ArrayPrototypeSplice-<n>.PoC-2.js
[o0102]: ./pocs/ArrayPrototypeToLocaleString-<n>.PoC.js
[o0103]: ./pocs/ArrayPrototypeSplice-<n>.PoC-3.js
[o0104]: ./pocs/ArrayPrototypeToSpliced-<n>.PoC-2.js
[o0105]: ./pocs/Map-0,1.PoC.js
[o0106]: ./pocs/SetPrototypeIsSubsetof-has,size.PoC.js
[o0107]: ./pocs/SetPrototypeIsSupersetOf-has,size.PoC.js
[o0108]: ./pocs/JSONStringify-<n>.PoC.js

## Unaffected

The table below lists evaluated sections in the ECMAScript spec which were
deemed unaffected by prototype pollution.

| API                                    | Property        | Reason                                                                                                                   |
| -------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------ |
| [`[[DefineOwnProperty]]`][i0008]       | `<k>`           | _Not evaluated_                                                                                                          |
| [`[[Get]]`][i0009]                     | `<k>`           | _Not evaluated_                                                                                                          |
| [`[[GetOwnProperty]]`][i0007]          | `<k>`           | _Not evaluated_                                                                                                          |
| [`ArraySpeciesCreate`][i0006]          | `'constructor'` | Object on which lookup should happen must be an array, which means it must have a `constructor` property.                |
|                                        | `@@species`     | Object on which lookup should happen must be an array constructor, which means it must have a `@@species` property.      |
| [`Array.prototype.reduceRight`][i0019] | `<n>`           | Cannot affect initial value because the last index necessarily coincides with the array length.                          |
| [`HasBinding`][i0003]                  | `@@unscopable`  | _Not evaluated_                                                                                                          |
|                                        | `<n>`           | _Not evaluated_                                                                                                          |
| [`CopyDataProperties`][i0001]          | `<k>`           | Implementation should `ToObject` the subject, hence all own keys are actually own keys.                                  |
| [`CreateRegExpStringIterator`][i0018]  | `0`             | Only ever invoked on a properly constructed RegExp, meaning `0` is always defined.                                       |
|                                        | `'lastIndex'`   | This property is explicitly set in all functions calling this abstract operation.                                        |
| [`Error.prototype.toString`][i0014]    | `'name'`        | `this` will realistically only be an instance of Error, in which case `name` is defined on `Error.prototype`.            |
|                                        | `'message'`     | `this` will realistically only be an instance of Error, in which case `message` is defined on `Error.prototype`.         |
| [`Function.prototype.bind`][i0013]     | `'length'`      | It is checked that the property is an own property before it is accessed.                                                |
| [`GetBindingValue`][i0004]             | `<n>`           | Checks `HasProperty` before `Get`.                                                                                       |
| [`GetPrototypeFromConstructor`][i0005] | `'prototype'`   | Object on which lookup should happen must be a callable, which means it must have a `prototype` property.                |
| [`GetSubstitution`][i0015]             | `<k>`           | Getting properties on the `namedCapture` object which always has a `null` prototype.                                     |
| [`Object.assign`][i0010]               | `<k>`           | Will only access keys in the `[[OwnPropertyKeys]]` set.                                                                  |
| [`ObjectDefineProperties`][i0011]      | `<k>`           | Will only access keys in the `[[OwnPropertyKeys]]` set.                                                                  |
| [`OrdinaryHasInstance`][i0002]         | `'prototype'`   | Object on which lookup should happen must be a callable, which means it must have a `prototype` property.                |
| [`PromiseResolve`][i0020]              | `'constructor'` | It is checked that `x` is a `Promise`.                                                                                   |
| [`RegExpBuiltinExec`][i0017]           | `'lastIndex'`   | `R` is only ever an initialized RegExp.                                                                                  |
| [`RegExp.prototype.toString`][i0012]   | `'source'`      | `this` will realistically only be an instance of RegExp, in which case `source` is always defined.                       |
|                                        | `'flags'`       | `this` will realistically only be an instance of RegExp, in which case `flags` is always defined.                        |
| [`RegExp.prototype[@@match]`][i0016]   | `'unicode'`     | Only affects `lastIndex` incrementing, effect depends on user implementation (Note: may be accessed instead of "flags"). |
|                                        | `'unicodeSets'` | Only affects `lastIndex` incrementing, effect depends on user implementation (Note: may be accessed instead of "flags"). |

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
[i0013]: https://tc39.es/ecma262/#sec-function.prototype.bind
[i0014]: https://tc39.es/ecma262/#sec-error.prototype.tostring
[i0015]: https://tc39.es/ecma262/#sec-getsubstitution
[i0016]: https://tc39.es/ecma262/#sec-regexp.prototype-%symbol.match%
[i0017]: https://tc39.es/ecma262/#sec-regexpbuiltinexec
[i0018]: https://tc39.es/ecma262/#sec-createregexpstringiterator
[i0019]: https://tc39.es/ecma262/#sec-array.prototype.reduceright
[i0020]: https://tc39.es/ecma262/#sec-array.prototype.reduceright

## Methodology

Two approaches have been used to compile the list of usable and unusable runtime
gadgets.

### Manual (in progress)

A manual review of the ECMAScript [spec] has been conducted, specifically
looking for use of the `Get(O, P)` function. This function gets property `P`
from object `O`, hence if `P` is missing from `O` the lookup could be affected
by prototype pollution.

During manual testing, a proxy object like the one shown below is used to find
out what properties are being looked up exactly.

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

### `tc39/test262`

The [tc39/test262] suite is an extensive conformance test suite for the
ECMAScript specification. Hence, it should provide extensive coverage of all
JavaScript language features, and can thus be used to help automatically find
gadgets.

The [tc39](./tc39/) directory contains the materials necessary for using the
test262 suite in a semi-automated pipeline for finding runtime gadgets. More
detail can be found in its `README.md`.

## Related Work

<!-- 2025 -->
- [Follow My Flow: Unveiling Client-Side Prototype Pollution Gadgets from One Million Real-World Websites](https://www.computer.org/csdl/proceedings-article/sp/2025/223600a016/21B7Q7OZKms)

  Toolchain the find prototype pollution gadgets in websites. It cannot find the
  gadgets described in this repository because it cannot instrument the relevant
  code.

<!-- 2024 -->
- [Undefined-oriented Programming: Detecting and Chaining Prototype Pollution Gadgets in Node. js Template Engines for Malicious Consequences](https://www.computer.org/csdl/proceedings-article/sp/2024/313000a121/1Ub23uAzNcI)

  Toolchain to find prototype pollution in the Node.js template engines. It
  cannot find the gadgets described in this repository because it cannot
  statically analyze built-in functionality.

- [GHunter: Universal Prototype Pollution Gadgets in JavaScript Runtimes](https://www.usenix.org/conference/usenixsecurity24/presentation/cornelissen)

  Toolchain to find prototype pollution gadgets in the Node.js runtime. It
  cannot find the gadgets described in this repository because they're not
  covered by the binding code.

<!-- 2023 -->
- [Silent Spring: Prototype Pollution Leads to Remote Code Execution in Node.js](https://www.usenix.org/conference/usenixsecurity23/presentation/shcherbakov)

  Toolchain to find prototype pollution and gadgets in libraries and the Node.js
  runtime. It cannot find the gadgets described in this repository because it
  cannot statically analyze built-in functionality.

[fixed spec reference]: ./spec-reference.html
[spec]: https://tc39.es/ecma262 "ECMAScript Language Specification"
[tc39/test262]: https://github.com/tc39/test262
[well-known symbol]: https://tc39.es/ecma262/#sec-well-known-symbols "ECMAScript Well-Known Symbols"
