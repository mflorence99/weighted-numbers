import { WeightedNumber } from './weighted-number';

/**
 * Pounds, shillings, pence implementation
 */

const FARTHINGS = {
  '0.00': '',
  '0.25': '¼',
  '0.50': '½',
  '0.75': '¾'
};

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
      const pence = Math.trunc(Math.abs(this.pence));
      // NOTE: a lot of trouble to show nearest farthing
      const quarters = (Math.round(Math.abs(this.pence) * 4) / 4);
      const ix = (quarters - Math.floor(quarters)).toFixed(2);
      const farthings = FARTHINGS[ix];
      let formatted;
      // TODO: we could do much better than this
      // NOTE: "retail" format for "small" values like 32/6
      if (this.isPositive() && (pounds < 5))
        formatted = `${(pounds * 20) + shillings}/${pence || '-'}${farthings}`;
      else formatted = `£${pounds} ${shillings}s ${pence}${farthings}d`;
      return this.isNegative()? `(${formatted})` : formatted;
    }
  }

}
