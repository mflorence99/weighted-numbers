/**
 * Base class
 */

 export type FormatterFn = (value: number, unit?: string) => string;

export abstract class WeightedNumber {

  // NOTE: micros gives the multiplier for each unit to get the micro unit
  private micros: Record<string,number> = { };

  /** ctor */
  constructor(public readonly units: readonly string[], 
              public readonly weights: Record<string,number>,
                     readonly values: Record<string,number>,
              public readonly formatters: Record<string, FormatterFn> = { }) { 
    Object.assign(this, values);
    this.makeMicros();
    this.denormalize();
    this.normalize();
  }

  /** Add another weighted number of like type to this */
  add(values: Record<string,number>): void {
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
    const dflt = (value, unit): string => `${value} ${unit}`;
    this.units
      .filter(unit => !!this[unit])
      .forEach(unit => {
        const formatter = this.formatters[unit]? this.formatters[unit] : dflt;
        formatted.splice(0, 0, formatter(this[unit], unit));
      });
    return formatted.join(' ');
  }

  /** Subtract another weighted number of like type from this */
  subtract(values: Record<string, number>): void {
    this.add(Object.keys(values).reduce((acc, cur) => {
      acc[cur] = values[cur] * -1;
      return acc;
    }, { }));
  }

  // private methods

  private denormalize(): void {
    this.units
      .filter(unit => !!this[unit])
      .forEach((unit, ix) => {
        if (ix > 0) {
          const v = this[unit] * this.micros[unit];
          this[unit] = 0;
          this[this.units[0]] += v;
        }
      });
  }

  private makeMicros(): void {
    let factor = 1;
    this.units.forEach((unit, ix, units) => {
      if (ix > 0) {
        const prior = units[ix - 1];
        const w = this.weights[prior] || 1;
        factor *= w;
        this.micros[unit] = factor;
      }
    });
  }

  private normalize(): void {
    let c = 0;
    this.units.forEach(unit => {
      const v = this[unit] || 0;
      const w = this.weights[unit];
      this[unit] = w? (v + c) % w : (v + c);
      c = w? Math.trunc((v + c) / w) : c;
    });
  }

}
