# Prototype Pollution affects the JavaScript Runtime

This repository aims to provide a list of JavaScript language functionality that
can be affected by prototype pollution.

## TODO

- Continue in the [spec](https://tc39.es/ecma262), currently at `Get(` 18/158.
- Replicate gadgets from `Object.defineProperty` with `Object.defineProperties`.

## Overview

The table below provides an overview of known functions affected by prototype
pollution in the JavaScript language, or _gadgets_. This list is not exhaustive
both in terms of affected APIs and usable properties.

We try to categorize the gadgets into types. These types are very subjective and
mostly try to give an indication of how problematic the gadget is in terms of
language design.

- `1`: _Language_ - Gadgets that occur because of the language design.
- `2`: _User provided object_ - Gadgets that occur because a user provided
  object is used.
- `3`: _Faulty implementation_ - Gadgets that occur because a user uses an
  object that is implemented incorrectly.

All gadgets were tested on Node.js v22.1.0, Deno v1.37.2, Chromium v124, and
Firefox v126.0.

| API                           | Prop(s)                             | Type | Node.js | Deno | Chromium      | Firefox       |
| ----------------------------- | ----------------------------------- | ---- | ------- | ---- | ------------- | ------------- |
| `[[OwnPropertyKeys]]`         | [`<n>`][o0001]                      | `3`  | Yes     | Yes  | Yes           | Yes           |
| `[[ToPrimitive]]`             | [`toString`][o0002]                 | `1`  | Yes     | Yes  | Yes           | Yes           |
|                               | [`valueOf`][o0003]                  | `1`  | Yes     | Yes  | Yes           | Yes           |
| `new ArrayBuffer`             | [`maxByteLength`][o0004]            | `2`  | Yes     | Yes  | Yes           | No            |
| `Function.prototype.apply`    | [`<n>`][o0005]                      | `3`  | Yes     | Yes  | Yes           | Yes           |
| `Iterator`                    | [`next`][o0006]                     | `3`  | Yes     | Yes  | Yes           | Yes           |
| `Object.defineProperty`       | [`configurable`][o0007]             | `2`  | Yes     | Yes  | Yes           | Yes           |
|                               | [`enumerable`][o0008]               | `2`  | Yes     | Yes  | Yes           | Yes           |
|                               | [`get`][o0009]                      | `2`  | Yes     | Yes  | Yes           | Yes           |
|                               | [`set`][o0010]                      | `2`  | Yes     | Yes  | Yes           | Yes           |
|                               | [`value`][o0011]                    | `2`  | Yes     | Yes  | Yes           | Yes           |
|                               | [`writable`][o0012]                 | `2`  | Yes     | Yes  | Yes           | Yes           |
| `Object.entries`              | [`enumerable`][o0013]               | `3`  | Yes     | Yes  | Yes           | Yes           |
| `Object.fromEntries`          | [`0,1`][o0014]                      | `1`  | Yes     | Yes  | Yes           | Yes           |
| `Object.keys`                 | [`enumerable`][o0015]               | `3`  | Yes     | Yes  | Yes           | Yes           |
| `Object.values`               | [`enumerable`][o0016]               | `3`  | Yes     | Yes  | Yes           | Yes           |
| `Reflect.apply`               | [`<n>`][o0017]                      | `3`  | Yes     | Yes  | Yes           | Yes           |
| `Reflect.construct`           | [`<n>`][o0018]                      | `3`  | Yes     | Yes  | Yes           | Yes           |
| `new SharedArrayBuffer`       | [`maxByteLength`][o0019]            | `2`  | Yes     | Yes  | _Unsupported_ | _Unsupported_ |
| `String.prototype.endsWith`   | [`@@match`][o0020]                  | `2`  | Yes     | Yes  | Yes           | Yes           |
| `String.prototype.includes`   | [`@@match`][o0021]                  | `2`  | Yes     | Yes  | Yes           | Yes           |
| `String.prototype.matchAll`   | [`@@match,@@matchAll,flags`][o0022] | `2`  | Yes     | Yes  | Yes           | Yes           |
| `String.prototype.replaceAll` | [`@@match,@@replace,flags`][o0023]  | `2`  | Yes     | Yes  | Yes           | Yes           |
| `String.prototype.startsWith` | [`@@match`][o0024]                  | `2`  | Yes     | Yes  | Yes           | Yes           |

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

## Unaffected

The table below lists evaluated sections in the ECMAScript spec which were
deemed unaffected by prototype pollution.

| API                            | Property    | Reason                                                                                                    |
| ------------------------------ | ----------- | --------------------------------------------------------------------------------------------------------- |
| [`CopyDataProperties`][i0001]  | `<key>`     | Implementation should `ToObject` the subject, hence all own keys are actually own keys.                   |
| [`OrdinaryHasInstance`][i0002] | `prototype` | Object on which lookup should happen must be a callable, which means it must have a `prototype` property. |

[i0001]: https://tc39.es/ecma262/#sec-copydataproperties
[i0002]: https://tc39.es/ecma262/#sec-ordinaryhasinstance

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

- [Silent Spring: Prototype Pollution Leads to Remote Code Execution in Node.js](https://www.usenix.org/conference/usenixsecurity23/presentation/shcherbakov)

  Toolchain to find prototype pollution and gadgets in libraries and the Node.js
  runtime. It cannot find the gadgets described in this repository because the
  it cannot statically analyze built-in functionality.
