import { FormatterFn } from './weighted-number';
import { WeightedNumber } from './weighted-number';

/**
 * Imperial Dry Volume implementation
 */

// NOTE: from micro to macro
const units = ['pints', 'quarts', 'gallons', 'pecks', 'bushels', 'chaldrons'] as const;

type Units = typeof units[number];

export type Formatters = {
  [unit in Units]?: FormatterFn;
};

type Values = {
  [unit in Units]?: number;
};

type Weights = {
  [unit in Units]?: number;
};

const weights: Weights = {
  bushels: 36,
  gallons: 2,
  pecks: 4,
  pints: 2,
  quarts: 4
};

export class IDV extends WeightedNumber {

  bushels: number;
  chaldrons: number;
  gallons: number;
  pecks: number;
  pints: number;
  quarts: number;

  /** ctor */
  constructor(readonly values: Values,
              readonly formatters: Formatters = { }) {
    super(units, weights, values, formatters);
  }

}
