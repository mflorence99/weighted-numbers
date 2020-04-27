import { WeightedNumber } from './weighted-number';

/**
 * Pounds, shillings, pence implementation
 */

// NOTE: from micro to macro
const UNITS = ['pence', 'shillings', 'pounds'] as const;

type Units = typeof UNITS[number];

type Values = {
  [unit in Units]?: number;
};

type Weights = {
  [unit in Units]?: number;
};

export class LSD extends WeightedNumber {

  pence: number;
  pounds: number;
  shillings: number;

  units = UNITS;

  weights: Readonly<Weights> = {
    pence: 12,
    shillings: 20
  };

  /** ctor */
  constructor(values: Values | LSD) {
    super();
    this.initialize(values);
  }

  /** @override Format values */
  format(): string {
    if (this.isZero())
      return '£0';
    else {
      const pounds = Math.abs(this.pounds);
      const shillings = Math.abs(this.shillings);
      const pence = Math.abs(this.pence);
      let formatted;
      // TODO: we could do much better than this
      // NOTE: "retail" format for "small" values like 32/6
      if (this.isPositive() && (pounds < 5))
        formatted = `${(pounds * 20) + shillings}/${pence? pence : '-'}`;
      else formatted = `£${pounds} ${shillings}s ${pence}d`;
      if (this.isNegative())
        return `(${formatted})`;
      else return formatted;
    }
  }

}
