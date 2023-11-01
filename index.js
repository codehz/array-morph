var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);

// node_modules/fast-array-diff/dist/diff/lcs.js
var require_lcs = __commonJS((exports) => {
  var lcs = function(a, b, compareFunc) {
    var M = a.length, N = b.length;
    var MAX = M + N;
    var v = { 1: 0 };
    for (var d = 0;d <= MAX; ++d) {
      for (var k = -d;k <= d; k += 2) {
        var x = undefined;
        if (k === -d || k !== d && v[k - 1] + 1 < v[k + 1]) {
          x = v[k + 1];
        } else {
          x = v[k - 1] + 1;
        }
        var y = x - k;
        while (x < M && y < N && compareFunc(a[x], b[y])) {
          x++;
          y++;
        }
        if (x === M && y === N) {
          return d;
        }
        v[k] = x;
      }
    }
    return -1;
  };
  var getSolution = function(a, aStart, aEnd, b, bStart, bEnd, d, startDirect, endDirect, compareFunc, elementsChanged) {
    var _a, _b, _c, _d;
    if (d === 0) {
      elementsChanged("same", a, aStart, aEnd, b, bStart, bEnd);
      return;
    } else if (d === aEnd - aStart + (bEnd - bStart)) {
      var removeFirst = (startDirect & Direct.horizontal ? 1 : 0) + (endDirect & Direct.vertical ? 1 : 0);
      var addFirst = (startDirect & Direct.vertical ? 1 : 0) + (endDirect & Direct.horizontal ? 1 : 0);
      if (removeFirst >= addFirst) {
        aStart !== aEnd && elementsChanged("remove", a, aStart, aEnd, b, bStart, bStart);
        bStart !== bEnd && elementsChanged("add", a, aEnd, aEnd, b, bStart, bEnd);
      } else {
        bStart !== bEnd && elementsChanged("add", a, aStart, aStart, b, bStart, bEnd);
        aStart !== aEnd && elementsChanged("remove", a, aStart, aEnd, b, bEnd, bEnd);
      }
      return;
    }
    var M = aEnd - aStart;
    var N = bEnd - bStart;
    var HALF = Math.floor(N / 2);
    var now = {};
    for (var k = -d - 1;k <= d + 1; ++k) {
      now[k] = { d: Infinity, segments: 0, direct: Direct.none };
    }
    var preview = (_a = {}, _a[-d - 1] = { d: Infinity, segments: 0, direct: Direct.none }, _a[d + 1] = { d: Infinity, segments: 0, direct: Direct.none }, _a);
    for (var y = 0;y <= HALF; ++y) {
      _b = __read([preview, now], 2), now = _b[0], preview = _b[1];
      var _loop_1 = function(k2) {
        var x = y + k2;
        if (y === 0 && x === 0) {
          now[k2] = {
            d: 0,
            segments: 0,
            direct: startDirect
          };
          return "continue";
        }
        var currentPoints = [
          {
            direct: Direct.horizontal,
            d: now[k2 - 1].d + 1,
            segments: now[k2 - 1].segments + (now[k2 - 1].direct & Direct.horizontal ? 0 : 1)
          },
          {
            direct: Direct.vertical,
            d: preview[k2 + 1].d + 1,
            segments: preview[k2 + 1].segments + (preview[k2 + 1].direct & Direct.vertical ? 0 : 1)
          }
        ];
        if (x > 0 && x <= M && y > 0 && y <= N && compareFunc(a[aStart + x - 1], b[bStart + y - 1])) {
          currentPoints.push({
            direct: Direct.diagonal,
            d: preview[k2].d,
            segments: preview[k2].segments + (preview[k2].direct & Direct.diagonal ? 0 : 1)
          });
        }
        var bestValue = currentPoints.reduce(function(best2, info) {
          if (best2.d > info.d) {
            return info;
          } else if (best2.d === info.d && best2.segments > info.segments) {
            return info;
          }
          return best2;
        });
        currentPoints.forEach(function(info) {
          if (bestValue.d === info.d && bestValue.segments === info.segments) {
            bestValue.direct |= info.direct;
          }
        });
        now[k2] = bestValue;
      };
      for (var k = -d;k <= d; ++k) {
        _loop_1(k);
      }
    }
    var now2 = {};
    for (var k = -d - 1;k <= d + 1; ++k) {
      now2[k] = { d: Infinity, segments: 0, direct: Direct.none };
    }
    var preview2 = (_c = {}, _c[-d - 1] = { d: Infinity, segments: 0, direct: Direct.none }, _c[d + 1] = { d: Infinity, segments: 0, direct: Direct.none }, _c);
    for (var y = N;y >= HALF; --y) {
      _d = __read([preview2, now2], 2), now2 = _d[0], preview2 = _d[1];
      var _loop_2 = function(k2) {
        var x = y + k2;
        if (y === N && x === M) {
          now2[k2] = {
            d: 0,
            segments: 0,
            direct: endDirect
          };
          return "continue";
        }
        var currentPoints = [
          {
            direct: Direct.horizontal,
            d: now2[k2 + 1].d + 1,
            segments: now2[k2 + 1].segments + (now2[k2 + 1].direct & Direct.horizontal ? 0 : 1)
          },
          {
            direct: Direct.vertical,
            d: preview2[k2 - 1].d + 1,
            segments: preview2[k2 - 1].segments + (preview2[k2 - 1].direct & Direct.vertical ? 0 : 1)
          }
        ];
        if (x >= 0 && x < M && y >= 0 && y < N && compareFunc(a[aStart + x], b[bStart + y])) {
          currentPoints.push({
            direct: Direct.diagonal,
            d: preview2[k2].d,
            segments: preview2[k2].segments + (preview2[k2].direct & Direct.diagonal ? 0 : 1)
          });
        }
        var bestValue = currentPoints.reduce(function(best2, info) {
          if (best2.d > info.d) {
            return info;
          } else if (best2.d === info.d && best2.segments > info.segments) {
            return info;
          }
          return best2;
        });
        currentPoints.forEach(function(info) {
          if (bestValue.d === info.d && bestValue.segments === info.segments) {
            bestValue.direct |= info.direct;
          }
        });
        now2[k2] = bestValue;
      };
      for (var k = d;k >= -d; --k) {
        _loop_2(k);
      }
    }
    var best = {
      k: -1,
      d: Infinity,
      segments: 0,
      direct: Direct.none
    };
    for (var k = -d;k <= d; ++k) {
      var dSum = now[k].d + now2[k].d;
      if (dSum < best.d) {
        best.k = k;
        best.d = dSum;
        best.segments = now[k].segments + now2[k].segments + (now[k].segments & now2[k].segments ? 0 : 1);
        best.direct = now2[k].direct;
      } else if (dSum === best.d) {
        var segments = now[k].segments + now2[k].segments + (now[k].segments & now2[k].segments ? 0 : 1);
        if (segments < best.segments) {
          best.k = k;
          best.d = dSum;
          best.segments = segments;
          best.direct = now2[k].direct;
        } else if (segments === best.segments && !(best.direct & Direct.diagonal) && now2[k].direct & Direct.diagonal) {
          best.k = k;
          best.d = dSum;
          best.segments = segments;
          best.direct = now2[k].direct;
        }
      }
    }
    if (HALF + best.k === 0 && HALF === 0) {
      HALF++;
      now[best.k].direct = now2[best.k].direct;
      now2[best.k].direct = preview2[best.k].direct;
    }
    getSolution(a, aStart, aStart + HALF + best.k, b, bStart, bStart + HALF, now[best.k].d, startDirect, now2[best.k].direct, compareFunc, elementsChanged);
    getSolution(a, aStart + HALF + best.k, aEnd, b, bStart + HALF, bEnd, now2[best.k].d, now[best.k].direct, endDirect, compareFunc, elementsChanged);
  };
  var bestSubSequence = function(a, b, compareFunc, elementsChanged) {
    var d = lcs(a, b, compareFunc);
    getSolution(a, 0, a.length, b, 0, b.length, d, Direct.diagonal, Direct.all, compareFunc, elementsChanged);
  };
  var __read = exports && exports.__read || function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m)
      return o;
    var i = m.call(o), r, ar = [], e;
    try {
      while ((n === undefined || n-- > 0) && !(r = i.next()).done)
        ar.push(r.value);
    } catch (error) {
      e = { error };
    } finally {
      try {
        if (r && !r.done && (m = i["return"]))
          m.call(i);
      } finally {
        if (e)
          throw e.error;
      }
    }
    return ar;
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var Direct;
  (function(Direct2) {
    Direct2[Direct2["none"] = 0] = "none";
    Direct2[Direct2["horizontal"] = 1] = "horizontal";
    Direct2[Direct2["vertical"] = 2] = "vertical";
    Direct2[Direct2["diagonal"] = 4] = "diagonal";
    Direct2[Direct2["all"] = 7] = "all";
  })(Direct || (Direct = {}));
  exports.default = bestSubSequence;
});

// node_modules/fast-array-diff/dist/diff/same.js
var require_same = __commonJS((exports) => {
  var default_1 = function(a, b, compareFunc) {
    if (compareFunc === undefined) {
      compareFunc = function(ia, ib) {
        return ia === ib;
      };
    }
    var ret = [];
    (0, lcs_1.default)(a, b, compareFunc, function(type, oldArr, oldStart, oldEnd) {
      if (type === "same") {
        for (var i = oldStart;i < oldEnd; ++i) {
          ret.push(oldArr[i]);
        }
      }
    });
    return ret;
  };
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var lcs_1 = __importDefault(require_lcs());
  exports.default = default_1;
});

// node_modules/fast-array-diff/dist/diff/diff.js
var require_diff = __commonJS((exports) => {
  var diff = function(a, b, compareFunc) {
    if (compareFunc === undefined) {
      compareFunc = function(ia, ib) {
        return ia === ib;
      };
    }
    var ret = {
      removed: [],
      added: []
    };
    (0, lcs_1.default)(a, b, compareFunc, function(type, oldArr, oldStart, oldEnd, newArr, newStart, newEnd) {
      if (type === "add") {
        for (var i = newStart;i < newEnd; ++i) {
          ret.added.push(newArr[i]);
        }
      } else if (type === "remove") {
        for (var i = oldStart;i < oldEnd; ++i) {
          ret.removed.push(oldArr[i]);
        }
      }
    });
    return ret;
  };
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.diff = undefined;
  var lcs_1 = __importDefault(require_lcs());
  exports.diff = diff;
});

// node_modules/fast-array-diff/dist/diff/patch.js
var require_patch = __commonJS((exports) => {
  var getPatch = function(a, b, compareFunc) {
    if (compareFunc === undefined) {
      compareFunc = function(ia, ib) {
        return ia === ib;
      };
    }
    var patch = [];
    var lastAdd = null;
    var lastRemove = null;
    function pushChange(type, oldArr, oldStart, oldEnd, newArr, newStart, newEnd) {
      if (type === "same") {
        if (lastRemove) {
          patch.push(lastRemove);
        }
        if (lastAdd) {
          patch.push(lastAdd);
        }
        lastRemove = null;
        lastAdd = null;
      } else if (type === "remove") {
        if (!lastRemove) {
          lastRemove = {
            type: "remove",
            oldPos: oldStart,
            newPos: newStart,
            items: []
          };
        }
        for (var i = oldStart;i < oldEnd; ++i) {
          lastRemove.items.push(oldArr[i]);
        }
        if (lastAdd) {
          lastAdd.oldPos += oldEnd - oldStart;
          if (lastRemove.oldPos === oldStart) {
            lastRemove.newPos -= oldEnd - oldStart;
          }
        }
      } else if (type === "add") {
        if (!lastAdd) {
          lastAdd = {
            type: "add",
            oldPos: oldStart,
            newPos: newStart,
            items: []
          };
        }
        for (var i = newStart;i < newEnd; ++i) {
          lastAdd.items.push(newArr[i]);
        }
      }
    }
    (0, lcs_1.default)(a, b, compareFunc, pushChange);
    pushChange("same", [], 0, 0, [], 0, 0);
    return patch;
  };
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.getPatch = undefined;
  var lcs_1 = __importDefault(require_lcs());
  exports.getPatch = getPatch;
});

// node_modules/fast-array-diff/dist/diff/apply.js
var require_apply = __commonJS((exports) => {
  var applyPatch = function(a, patch) {
    var _a;
    var segments = [];
    var sameStart = 0;
    for (var i = 0;i < patch.length; ++i) {
      var patchItem = patch[i];
      sameStart !== patchItem.oldPos && segments.push(a.slice(sameStart, patchItem.oldPos));
      if (patchItem.type === "add") {
        segments.push(patchItem.items);
        sameStart = patchItem.oldPos;
      } else if (patchItem.items) {
        sameStart = patchItem.oldPos + patchItem.items.length;
      } else {
        sameStart = patchItem.oldPos + patchItem.length;
      }
    }
    sameStart !== a.length && segments.push(a.slice(sameStart));
    return (_a = []).concat.apply(_a, __spreadArray([], __read(segments), false));
  };
  var __read = exports && exports.__read || function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m)
      return o;
    var i = m.call(o), r, ar = [], e;
    try {
      while ((n === undefined || n-- > 0) && !(r = i.next()).done)
        ar.push(r.value);
    } catch (error) {
      e = { error };
    } finally {
      try {
        if (r && !r.done && (m = i["return"]))
          m.call(i);
      } finally {
        if (e)
          throw e.error;
      }
    }
    return ar;
  };
  var __spreadArray = exports && exports.__spreadArray || function(to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar;i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar)
            ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.applyPatch = undefined;
  exports.applyPatch = applyPatch;
});

// node_modules/fast-array-diff/dist/index.js
var require_dist = __commonJS((exports) => {
  var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m[k];
      } };
    }
    Object.defineProperty(o, k2, desc);
  } : function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    o[k2] = m[k];
  });
  var __exportStar = exports && exports.__exportStar || function(m, exports2) {
    for (var p in m)
      if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
        __createBinding(exports2, m, p);
  };
  var __importDefault = exports && exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.same = exports.bestSubSequence = undefined;
  var lcs_1 = __importDefault(require_lcs());
  exports.bestSubSequence = lcs_1.default;
  var same_1 = __importDefault(require_same());
  exports.same = same_1.default;
  __exportStar(require_diff(), exports);
  __exportStar(require_patch(), exports);
  __exportStar(require_apply(), exports);
});

// index.ts
var import_fast_array_diff = __toESM(require_dist(), 1);

class ArrayMorph {
  #current;
  #patch = [];
  constructor(initial = []) {
    this.#current = initial;
  }
  #extractFirstPatch() {
    const [first, ...remain] = this.#patch;
    switch (first.type) {
      case "add": {
        const {
          oldPos,
          newPos,
          items: [head, ...tail]
        } = first;
        const after = remain.map((x) => ({ ...x, oldPos: x.oldPos + 1 }));
        if (tail.length) {
          const crafted = {
            type: "add",
            oldPos: oldPos + 1,
            newPos,
            items: tail
          };
          this.#patch = [crafted, ...after];
        } else {
          this.#patch = after;
        }
        return { type: "add", oldPos, newPos, items: [head] };
      }
      case "remove": {
        const {
          oldPos,
          newPos,
          items: [head, ...tail]
        } = first;
        const after = remain.map((x) => ({ ...x, oldPos: x.oldPos - 1 }));
        if (tail.length) {
          const crafted = {
            type: "remove",
            oldPos,
            newPos,
            items: tail
          };
          this.#patch = [crafted, ...after];
        } else {
          this.#patch = after;
        }
        return { type: "remove", oldPos, newPos, items: [head] };
      }
    }
  }
  update(value, compareFn = (a, b) => a === b) {
    this.#patch = import_fast_array_diff.getPatch(this.#current, value, compareFn);
  }
  next() {
    if (this.#patch.length === 0) {
      return { value: this.#current, done: true };
    }
    const patch = this.#extractFirstPatch();
    this.#current = import_fast_array_diff.applyPatch(this.#current, [patch]);
    return { value: this.#current, done: false };
  }
  [Symbol.iterator]() {
    return this;
  }
}
export {
  ArrayMorph as default
};
