import { Patch, applyPatch, getPatch } from "fast-array-diff";

export default class ArrayMorph<T> implements Iterator<T[]>, Iterable<T[]> {
  #current: T[];
  #patch: Patch<T> = [];
  constructor(initial: T[] = []) {
    this.#current = initial;
  }

  #extractFirstPatch(): Patch<T>[number] {
    const [first, ...remain] = this.#patch;
    switch (first.type) {
      case "add": {
        const {
          oldPos,
          newPos,
          items: [head, ...tail],
        } = first;
        const after = remain.map((x) => ({ ...x, oldPos: x.oldPos + 1 }));
        if (tail.length) {
          const crafted = {
            type: "add",
            oldPos: oldPos + 1,
            newPos,
            items: tail,
          } as const;
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
          items: [head, ...tail],
        } = first;
        const after = remain.map((x) => ({ ...x, oldPos: x.oldPos - 1 }));
        if (tail.length) {
          const crafted = {
            type: "remove",
            oldPos,
            newPos,
            items: tail,
          } as const;
          this.#patch = [crafted, ...after];
        } else {
          this.#patch = after;
        }
        return { type: "remove", oldPos, newPos, items: [head] };
      }
    }
  }

  update(value: T[], compareFn: (a: T, b: T) => boolean = (a, b) => a === b) {
    this.#patch = getPatch(this.#current, value, compareFn);
  }

  next(): IteratorResult<T[], any> {
    if (this.#patch.length === 0) {
      return { value: this.#current, done: true };
    }
    const patch = this.#extractFirstPatch();
    this.#current = applyPatch(this.#current, [patch]);
    return { value: this.#current, done: false };
  }

  [Symbol.iterator](): Iterator<T[]> {
    return this;
  }
}
