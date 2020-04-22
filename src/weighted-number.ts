/**
 * Base class
 */

export abstract class WeightedNumber {

  /** ctor */
  constructor(public readonly units: readonly string[], 
              public readonly weights: any,
                     readonly values: any) { 
    Object.assign(this, values);
    this.normalize();
  }

  /** Add another weighted number of like type to this */
  add(values: any): void {
    this.units
      .filter(unit => !!values[unit])
      .forEach(unit => {
        const v = this[unit] || 0;
        const delta = values[unit];
        this[unit] = v + delta;
      });
    this.normalize();
  }

  /** Format values */
  format(): string {
    const formatted: string[] = [];
    this.units
      .filter(unit => !!this[unit])
      .forEach(unit => formatted.splice(0, 0, `${this[unit]} ${unit}`));
    return formatted.join(', ');
  }

  /** Normalize values */
  normalize(): void {
    let c = 0;
    this.units
      .filter(unit => this.weights[unit])
      .forEach(unit => {
        const v = this[unit] || 0;
        const w = this.weights[unit];
        this[unit] = (v + c) % w;
        c = Math.trunc((v + c) / w);
      });
  }

}
