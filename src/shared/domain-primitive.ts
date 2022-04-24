import { objectPropertySort } from "~/util/object-property-sort";

type P = number | string | Date | null;
type D = DomainPrimitive<Primitive>;
type A = Array<D>;
type O = Record<string, A | D>;

export type Primitive = P | D | A | O;

type Key<T> = T extends O ? keyof T : never;
type Value<T> = T extends O ? never : T;

export abstract class DomainPrimitive<T extends Primitive, U extends string = string> {
  private domainPrimitiveBrand!: U;

  constructor(private readonly value: T) {
    this.value = this.validate(value);
  }

  protected abstract validate(value: T): T;

  valueOf(): Value<T>;
  valueOf<K extends Key<T>>(key: K): T[K];
  valueOf<K extends Key<T>>(key?: K) {
    if (key && this.isObj(key)) {
      return this.value[key];
    } else {
      return this.value;
    }
  }

  equals(that: DomainPrimitive<T, U>): boolean {
    return JSON.stringify(objectPropertySort(this)) === JSON.stringify(objectPropertySort(that));
  }

  private isObj(key: Key<T>): this is DomainPrimitive<O, U> {
    return !!key;
  }
}
