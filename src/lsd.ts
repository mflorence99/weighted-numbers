import { FormatterFn } from './weighted-number';
import { WeightedNumber } from './weighted-number';

/**
 * Pounds, shillings, pence implementation
 */

// NOTE: from micro to macro
const units = ['pence', 'shillings', 'pounds'] as const;

type Units = typeof units[number];

export type Formatters = {
  [unit in Units]?: FormatterFn;
};

const formatterfns: Formatters = {
  pence: (value) => `${value}d`,
  pounds: (value) => `£${value}`,
  shillings: (value) => `${value}s`
};

type Values = {
  [unit in Units]?: number;
};

type Weights = {
  [unit in Units]?: number;
};

const weights: Weights = {
  pence: 12,
  shillings: 20
};

export class LSD extends WeightedNumber {

  pence: number;
  pounds: number;
  shillings: number;

  /** ctor */
  constructor(readonly values: Values,
              readonly formatters: Formatters = formatterfns) {
    super(units, weights, values, formatters);
  }

}
