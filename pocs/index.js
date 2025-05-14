// SPDX-License-Identifier: BlueOak-1.0.0

import * as ToPrimitiveToString from "./[[ToPrimitive]]-toString.PoC.js";
import * as ToPrimitiveValueOf from "./[[ToPrimitive]]-valueOf.PoC.js";
import * as AggregateErrorCause from "./AggregateError-cause.PoC.js";
import * as ArrayBufferMaxByteLength from "./ArrayBuffer-maxByteLength.PoC.js";
import * as ArrayFromN from "./ArrayFrom-<n>.PoC.js";
import * as ArrayPrototypeAtN from "./ArrayPrototypeAt-<n>.PoC.js";
import * as ArrayPrototypeConcatN from "./ArrayPrototypeConcat-<n>.PoC.js";
import * as ArrayPrototypeConcatSymbolIsConcatSpreadable from "./ArrayPrototypeConcat-@@isConcatSpreadable.PoC.js";
import * as ArrayPrototypeCopyWithinN from "./ArrayPrototypeCopyWithin-<n>.PoC.js";
import * as ArrayPrototypeEveryN from "./ArrayPrototypeEvery-<n>.PoC.js";
import * as ArrayPrototypeFillN from "./ArrayPrototypeFill-<n>.PoC.js";
import * as ArrayPrototypeFilterN from "./ArrayPrototypeFilter-<n>.PoC.js";
import * as ArrayPrototypeFindN from "./ArrayPrototypeFind-<n>.PoC.js";
import * as ArrayPrototypeFindIndexN from "./ArrayPrototypeFindIndex-<n>.PoC.js";
import * as ArrayPrototypeFindLastN from "./ArrayPrototypeFindLast-<n>.PoC.js";
import * as ArrayPrototypeFindLastIndexN from "./ArrayPrototypeFindLastIndex-<n>.PoC.js";
import * as ArrayPrototypeFlatN from "./ArrayPrototypeFlat-<n>.PoC.js";
import * as ArrayPrototypeFlatMapN1 from "./ArrayPrototypeFlatMap-<n>.PoC-1.js";
import * as ArrayPrototypeFlatMapN2 from "./ArrayPrototypeFlatMap-<n>.PoC-2.js";
import * as ArrayPrototypeForEachN from "./ArrayPrototypeForEach-<n>.PoC.js";
import * as ArrayPrototypeIncludesN from "./ArrayPrototypeIncludes-<n>.PoC.js";
import * as ArrayPrototypeIndexOfN from "./ArrayPrototypeIndexOf-<n>.PoC.js";
import * as ArrayPrototypeJoinN from "./ArrayPrototypeJoin-<n>.PoC.js";
import * as ArrayPrototypeLastIndexOfN from "./ArrayPrototypeLastIndexOf-<n>.PoC.js";
import * as ArrayPrototypeMapN from "./ArrayPrototypeMap-<n>.PoC.js";
import * as ArrayPrototypePopN from "./ArrayPrototypePop-<n>.PoC.js";
import * as ArrayPrototypeReduceN1 from "./ArrayPrototypeReduce-<n>.PoC-1.js";
import * as ArrayPrototypeReduceN2 from "./ArrayPrototypeReduce-<n>.PoC-2.js";
import * as ArrayPrototypeReduceRightN from "./ArrayPrototypeReduceRight-<n>.PoC.js";
import * as ArrayPrototypeReverseN from "./ArrayPrototypeReverse-<n>.PoC.js";
import * as ArrayPrototypeShiftN1 from "./ArrayPrototypeShift-<n>.PoC-1.js";
import * as ArrayPrototypeShiftN2 from "./ArrayPrototypeShift-<n>.PoC-2.js";
import * as ArrayPrototypeSliceN from "./ArrayPrototypeSlice-<n>.PoC.js";
import * as ArrayPrototypeSomeN from "./ArrayPrototypeSome-<n>.PoC.js";
import * as ArrayPrototypeSortN from "./ArrayPrototypeSort-<n>.PoC.js";
import * as ArrayPrototypeSpliceN1 from "./ArrayPrototypeSplice-<n>.PoC-1.js";
import * as ArrayPrototypeSpliceN2 from "./ArrayPrototypeSplice-<n>.PoC-2.js";
import * as ArrayPrototypeSpliceN3 from "./ArrayPrototypeSplice-<n>.PoC-3.js";
import * as ArrayPrototypeToLocaleStringN from "./ArrayPrototypeToLocaleString-<n>.PoC.js";
import * as ArrayPrototypeToReversedN from "./ArrayPrototypeToReversed-<n>.PoC.js";
import * as ArrayPrototypeToSortedN from "./ArrayPrototypeToSorted-<n>.PoC.js";
import * as ArrayPrototypeToSplicedN1 from "./ArrayPrototypeToSpliced-<n>.PoC-1.js";
import * as ArrayPrototypeToSplicedN2 from "./ArrayPrototypeToSpliced-<n>.PoC-2.js";
import * as ArrayPrototypeToStringJoin from "./ArrayPrototypeToString-join.PoC.js";
import * as ArrayPrototypeUnshiftN from "./ArrayPrototypeUnshift-<n>.PoC.js";
import * as ArrayPrototypeWithN from "./ArrayPrototypeWith-<n>.PoC.js";
import * as ErrorCause from "./Error-cause.PoC.js";
import * as FunctionPrototypeApplyN from "./FunctionPrototypeApply-<n>.PoC.js";
import * as FunctionPrototypeBindName from "./FunctionPrototypeBind-name.PoC.js";
import * as IteratorDone from "./Iterator-done.PoC.js";
import * as IteratorNext from "./Iterator-next.PoC.js";
import * as IteratorReturn from "./Iterator-return.PoC.js";
import * as IteratorValue from "./Iterator-value.PoC.js";
import * as JSONStringifyN from "./JSONStringify-<n>.PoC.js";
import * as JSONStringifyToJSON from "./JSONStringify-toJSON.PoC.js";
import * as Map01 from "./Map-0,1.PoC.js";
import * as ObjectDefinePropertiesConfigurable from "./ObjectDefineProperties-configurable.PoC.js";
import * as ObjectDefinePropertiesEnumerable from "./ObjectDefineProperties-enumerable.PoC.js";
import * as ObjectDefinePropertiesGet from "./ObjectDefineProperties-get.PoC.js";
import * as ObjectDefinePropertiesSet from "./ObjectDefineProperties-set.PoC.js";
import * as ObjectDefinePropertiesValue from "./ObjectDefineProperties-value.PoC.js";
import * as ObjectDefinePropertiesWritable from "./ObjectDefineProperties-writable.PoC.js";
import * as ObjectDefinePropertyConfigurable from "./ObjectDefineProperty-configurable.PoC.js";
import * as ObjectDefinePropertyEnumerable from "./ObjectDefineProperty-enumerable.PoC.js";
import * as ObjectDefinePropertyGet from "./ObjectDefineProperty-get.PoC.js";
import * as ObjectDefinePropertySet from "./ObjectDefineProperty-set.PoC.js";
import * as ObjectDefinePropertyValue from "./ObjectDefineProperty-value.PoC.js";
import * as ObjectDefinePropertyWritable from "./ObjectDefineProperty-writable.PoC.js";
import * as ObjectEntriesEnumerable from "./ObjectEntries-enumerable.PoC.js";
import * as ObjectFreezeK from "./ObjectFreeze-<k>.PoC.js";
import * as ObjectFromEntries01 from "./ObjectFromEntries-0,1.PoC.js";
import * as ObjectKeysKEnumerable from "./ObjectKeys-<k>,enumerable.PoC.js";
import * as ObjectKeysEnumerable from "./ObjectKeys-enumerable.PoC.js";
import * as ObjectPrototypeToStringSymbolToStringTag from "./ObjectPrototypeToString-@@toStringTag.PoC.js";
import * as ObjectSealK from "./ObjectSeal-<k>.PoC.js";
import * as ObjectValuesEnumerable from "./ObjectValues-enumerable.PoC.js";
import * as ProxyApply from "./Proxy-apply.PoC.js";
import * as ProxyConstruct from "./Proxy-construct.PoC.js";
import * as ProxyDefineProperty from "./Proxy-defineProperty.PoC.js";
import * as ProxyDeleteProperty from "./Proxy-deleteProperty.PoC.js";
import * as ProxyGetOwnPropertyDescriptor from "./Proxy-getOwnPropertyDescriptor.PoC.js";
import * as ProxyIsExtensible from "./Proxy-isExtensible.PoC.js";
import * as ProxyOwnKeys from "./Proxy-ownKeys.PoC.js";
import * as ProxyPreventExtensions from "./Proxy-preventExtensions.PoC.js";
import * as ProxySet from "./Proxy-set.PoC.js";
import * as ProxySetPrototypeOf from "./Proxy-setPrototypeOf.PoC.js";
import * as ReflectApplyN from "./ReflectApply-<n>.PoC.js";
import * as ReflectConstructN from "./ReflectConstruct-<n>.PoC.js";
import * as ReflectDefinePropertyConfigurable from "./ReflectDefineProperty-configurable.PoC.js";
import * as ReflectDefinePropertyEnumerable from "./ReflectDefineProperty-enumerable.PoC.js";
import * as ReflectDefinePropertyGet from "./ReflectDefineProperty-get.PoC.js";
import * as ReflectDefinePropertySet from "./ReflectDefineProperty-set.PoC.js";
import * as ReflectDefinePropertyValue from "./ReflectDefineProperty-value.PoC.js";
import * as ReflectDefinePropertyWritable from "./ReflectDefineProperty-writable.PoC.js";
import * as ReflectOwnKeysN from "./ReflectOwnKeys-<n>.PoC.js";
import * as RegExpSource from "./RegExp-source.PoC.js";
import * as RegExpPrototypeMatch0 from "./RegExpPrototype@@match-0.PoC.js";
import * as RegExpPrototypeMatchExec from "./RegExpPrototype@@match-exec.PoC.js";
import * as RegExpPrototypeMatchFlags from "./RegExpPrototype@@match-flags.PoC.js";
import * as RegExpPrototypeMatchGlobal from "./RegExpPrototype@@match-global.PoC.js";
import * as RegExpPrototypeMatchAllFlags from "./RegExpPrototype@@matchAll-flags.PoC.js";
import * as RegExpPrototypeMatchAllLastIndex from "./RegExpPrototype@@matchAll-lastIndex.PoC.js";
import * as SharedArrayBufferMaxByteLength from "./SharedArrayBuffer-maxByteLength.PoC.js";
import * as SetPrototypeDifferenceHasSize from "./SetPrototypeDifference-has,size.PoC.js";
import * as SetPrototypeIntersectionHasSize from "./SetPrototypeIntersection-has,size.PoC.js";
import * as SetPrototypeIsDisjointFromHasSize from "./SetPrototypeIsDisjointFrom-has,size.PoC.js";
import * as SetPrototypeIsSubsetOfHasSize from "./SetPrototypeIsSubsetOf-has,size.PoC.js";
import * as SetPrototypeIsSupersetOfHasSize from "./SetPrototypeIsSupersetOf-has,size.PoC.js";
import * as SetPrototypeSymmetricDifferenceHasSize from "./SetPrototypeSymmetricDifference-has,size.PoC.js";
import * as SetPrototypeUnionHasSize from "./SetPrototypeUnion-has,size.PoC.js";
import * as StringPrototypeEndsWithSymbolMatch from "./StringPrototypeEndsWith-@@match.PoC.js";
import * as StringPrototypeIncludesSymbolMatch from "./StringPrototypeIncludes-@@match.PoC.js";
import * as StringPrototypeMatchAllMatchMatchAllFlag from "./StringPrototypeMatchAll-@@match,@@matchAll,flag.PoC.js";
import * as StringPrototypeReplaceAllMatchReplaceFlag from "./StringPrototypeReplaceAll-@@match,@@replace,flag.PoC.js";
import * as StringPrototypeStartsWithSymbolMatch from "./StringPrototypeStartsWith-@@match.PoC.js";
import * as StringRawRaw from "./StringRaw-raw.PoC.js";
import * as TypedArrayN from "./TypedArrayFrom-<n>.PoC.js";

export const tests = [
	ToPrimitiveToString,
	ToPrimitiveValueOf,
	AggregateErrorCause,
	ArrayBufferMaxByteLength,
	ArrayFromN,
	ArrayPrototypeAtN,
	ArrayPrototypeConcatN,
	ArrayPrototypeConcatSymbolIsConcatSpreadable,
	ArrayPrototypeCopyWithinN,
	ArrayPrototypeEveryN,
	ArrayPrototypeFillN,
	ArrayPrototypeFilterN,
	ArrayPrototypeFindN,
	ArrayPrototypeFindIndexN,
	ArrayPrototypeFindLastN,
	ArrayPrototypeFindLastIndexN,
	ArrayPrototypeFlatN,
	ArrayPrototypeFlatMapN1,
	ArrayPrototypeFlatMapN2,
	ArrayPrototypeForEachN,
	ArrayPrototypeIncludesN,
	ArrayPrototypeIndexOfN,
	ArrayPrototypeJoinN,
	ArrayPrototypeLastIndexOfN,
	ArrayPrototypeMapN,
	ArrayPrototypePopN,
	ArrayPrototypeReduceN1,
	ArrayPrototypeReduceN2,
	ArrayPrototypeReduceRightN,
	ArrayPrototypeReverseN,
	ArrayPrototypeShiftN1,
	ArrayPrototypeShiftN2,
	ArrayPrototypeSliceN,
	ArrayPrototypeSomeN,
	ArrayPrototypeSortN,
	ArrayPrototypeSpliceN1,
	ArrayPrototypeSpliceN2,
	ArrayPrototypeSpliceN3,
	ArrayPrototypeToLocaleStringN,
	ArrayPrototypeToReversedN,
	ArrayPrototypeToSortedN,
	ArrayPrototypeToSplicedN1,
	ArrayPrototypeToSplicedN2,
	ArrayPrototypeToStringJoin,
	ArrayPrototypeUnshiftN,
	ArrayPrototypeWithN,
	ErrorCause,
	FunctionPrototypeApplyN,
	FunctionPrototypeBindName,
	IteratorDone,
	IteratorNext,
	IteratorReturn,
	IteratorValue,
	JSONStringifyN,
	JSONStringifyToJSON,
	Map01,
	ObjectDefinePropertiesConfigurable,
	ObjectDefinePropertiesEnumerable,
	ObjectDefinePropertiesGet,
	ObjectDefinePropertiesSet,
	ObjectDefinePropertiesValue,
	ObjectDefinePropertiesWritable,
	ObjectDefinePropertyConfigurable,
	ObjectDefinePropertyEnumerable,
	ObjectDefinePropertyGet,
	ObjectDefinePropertySet,
	ObjectDefinePropertyValue,
	ObjectDefinePropertyWritable,
	ObjectEntriesEnumerable,
	ObjectFreezeK,
	ObjectFromEntries01,
	ObjectKeysKEnumerable,
	ObjectKeysEnumerable,
	ObjectPrototypeToStringSymbolToStringTag,
	ObjectSealK,
	ObjectValuesEnumerable,
	ProxyApply,
	ProxyConstruct,
	ProxyDefineProperty,
	ProxyDeleteProperty,
	ProxyGetOwnPropertyDescriptor,
	ProxyIsExtensible,
	ProxyOwnKeys,
	ProxyPreventExtensions,
	ProxySet,
	ProxySetPrototypeOf,
	ReflectApplyN,
	ReflectConstructN,
	ReflectDefinePropertyConfigurable,
	ReflectDefinePropertyEnumerable,
	ReflectDefinePropertyGet,
	ReflectDefinePropertySet,
	ReflectDefinePropertyValue,
	ReflectDefinePropertyWritable,
	ReflectOwnKeysN,
	RegExpSource,
	RegExpPrototypeMatch0,
	RegExpPrototypeMatchExec,
	RegExpPrototypeMatchFlags,
	RegExpPrototypeMatchGlobal,
	RegExpPrototypeMatchAllFlags,
	RegExpPrototypeMatchAllLastIndex,
	SharedArrayBufferMaxByteLength,
	SetPrototypeDifferenceHasSize,
	SetPrototypeIntersectionHasSize,
	SetPrototypeIsDisjointFromHasSize,
	SetPrototypeIsSubsetOfHasSize,
	SetPrototypeIsSupersetOfHasSize,
	SetPrototypeSymmetricDifferenceHasSize,
	SetPrototypeUnionHasSize,
	StringPrototypeEndsWithSymbolMatch,
	StringPrototypeIncludesSymbolMatch,
	StringPrototypeMatchAllMatchMatchAllFlag,
	StringPrototypeReplaceAllMatchReplaceFlag,
	StringPrototypeStartsWithSymbolMatch,
	StringRawRaw,
	TypedArrayN,
];
