/**
 * Base class
 */

 export type FormatterFn = (value: number, unit: string) => string;

export abstract class WeightedNumber {

  /** ctor */
  constructor(public readonly units: readonly string[], 
              public readonly weights: Record<string,number>,
                     readonly values: Record<string,number>,
              public readonly formatters: Record<string, FormatterFn> = { }) { 
    Object.assign(this, values);
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

  /** Normalize values */
  normalize(): void {
    let c = 0;
    this.units
      .forEach(unit => {
        const v = this[unit] || 0;
        const w = this.weights[unit];
        this[unit] = w? (v + c) % w : (v + c);
        c = w? Math.trunc((v + c) / w) : c;
      });
  }

}
