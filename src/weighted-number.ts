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
  add(values: Values): this {
    const a = this.denormalize();
    const b = this.clone(values).denormalize();
    const micro = this.units[0];
    a[micro] += b[micro];
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

  /** Is this weighted number negative? */
  isNegative(): boolean {
    return this.units
      .map(unit => this[unit] || 0)
      .some(value => value < 0);
  }


  /** Is this weighted number zero? */
  isZero(): boolean {
    return this.units
      .map(unit => this[unit] || 0)
      .every(value => value === 0);
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
    return Object.assign(Object.create(this), this, values); 
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

}
