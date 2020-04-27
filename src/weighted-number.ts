/**
 * Base class
 */
type Values = Record<string, number> | WeightedNumber;

export abstract class WeightedNumber {

  // NOTE: micros gives the multiplier for each unit to get the micro unit
  private micros: Record<string, number> = {};

  abstract units: readonly string[];
  abstract weights: Readonly<Record<string, number>>;

  /** Add another weighted number of like type to this */
  add(another: Values): this {
    const { a, b, micro } = this.precompare(another);
    a[micro] += b[micro];
    return a.normalize() as any;
  }

  /** Divide this weighted number by a scalar quantity */
  divide(factor: number): this {
    const { a, micro } = this.precompare();
    a[micro] /= factor;
    return a.normalize() as any;
  }

  /** Format values */
  format(): string {
    if (this.isZero())
      return `0 ${this.units[0]}`;
    else {
      const formatted: string[] = [];
      this.units
        .filter(unit => !!this[unit])
        .forEach(unit => formatted.splice(0, 0, `${Math.abs(this[unit])} ${unit}`));
      if (this.isNegative())
        return `(${formatted.join(', ')})`;
      else return formatted.join(', ');
    }
  }

  /** Is this weighted number equal to another of like type */
  isEqual(another: Values): boolean {
    const { a, b, micro } = this.precompare(another);
    return a[micro] === b[micro];
  }

  /** Is this weighted number greater than another of like type */
  isGreater(another: Values): boolean {
    const { a, b, micro } = this.precompare(another);
    return a[micro] > b[micro];
  }

  /** Is this weighted number less than another of like type */
  isLess(another: Values): boolean {
    const { a, b, micro } = this.precompare(another);
    return a[micro] < b[micro];
  }

  /** Is this weighted number negative? */
  isNegative(): boolean {
    return this.units
      .map(unit => this[unit] || 0)
      .some(value => value < 0);
  }

  /** Is this weighted number positive? */
  isPositive(): boolean {
    return !this.isNegative();
  }

  /** Is this weighted number zero? */
  isZero(): boolean {
    return this.units
      .map(unit => this[unit] || 0)
      .every(value => value === 0);
  }

  /** Multiply this weighted number by a scalar quantity */
  multiply(factor: number): this {
    const { a, micro } = this.precompare();
    a[micro] *= factor;
    return a.normalize() as any;
  }

  /** Subtract another weighted number of like type from this */
  subtract(another: Values): this {
    const { a, b, micro } = this.precompare(another);
    a[micro] -= b[micro];
    return a.normalize() as any;
  }

  // protected methods

  protected initialize(values: Values): void {
    this.units.forEach(unit => this[unit] = values[unit] || 0);
    this.makeMicros();
    this.denormalize(this);
    this.normalize(this);
  }

  // private methods

  private clone(values: Values): this {
    const obj = Object.assign(Object.create(this), this); 
    // NOTE: supplied values may be sparse
    this.units.forEach(unit => obj[unit] = values[unit] || 0);
    return obj;
  }

  private denormalize(values: Values = { }): this {
    // using the pre-computed "micros" reduce to the most micro unit
    // NOTE: provision of "values" enables mutability
    const denormalized = this.units.reduce((acc, unit, ix) => {
      const v = (this[unit] || 0) * this.micros[unit];
      if (ix > 0) {
        acc[unit] = 0;
        acc[this.units[0]] += v;
      }
      else acc[unit] = this[unit];
      return acc;
    }, values);
    return this.clone(denormalized);
  }

  private makeMicros(): void {
    let factor = 1;
    // using supplied weights, pre-compute multiplier to reduce
    // each unit to the most micro
    this.units.forEach((unit, ix, units) => {
      if (ix > 0) {
        const prior = units[ix - 1];
        const w = this.weights[prior] || 1;
        factor *= w;
        this.micros[unit] = factor;
      }
      else this.micros[unit] = 1;
    });
  }

  private normalize(values: Values = { }): this {
    let c = 0;
    // using the supplied weights, normalize units from micro to macro
    // NOTE: provision of "values" enables mutability
    const normalized = this.units.reduce((acc, unit) => {
      const v = this[unit] || 0;
      const w = this.weights[unit];
      acc[unit] = w? (v + c) % w : (v + c);
      c = w? Math.trunc((v + c) / w) : c;
      return acc;
    }, values);
    return this.clone(normalized);
  }

  private precompare(another: Values = { }): 
      { a: WeightedNumber; b: WeightedNumber; micro: string } {
    const a = this.denormalize();
    const b = this.clone(another).denormalize();
    const micro = this.units[0];
    return { a, b, micro };
  }

}
