import { DomainPrimitive, Primitive } from "./domain-primitive";
import { Uuid } from "./uuid";

type D = DomainPrimitive<Primitive>;
type A = Array<D>;
type O = Record<"id", Uuid<string>> & Record<string, A | D>;

type Key<T> = keyof T;

export abstract class Entity<T extends O, U extends string> {
  private entityBrand!: U;

  constructor(private readonly value: T) {
    this.value = this.validate(value);
  }

  protected abstract validate(value: T): T;

  valueOf<K extends Key<T>>(key: K) {
    return this.value[key];
  }

  equals(that: Entity<T, U>): boolean {
    return this.value.id.equals(that.value.id);
  }
}
