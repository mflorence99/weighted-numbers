import { WeightedNumber } from './weighted-number';

/**
 * Imperial Dry Volume implementation
 */

// NOTE: from micro to macro
const UNITS = ['pints', 'quarts', 'gallons', 'pecks', 'bushels', 'chaldrons'] as const;

type Units = typeof UNITS[number];

type Values = {
  [unit in Units]?: number;
};

type Weights = {
  [unit in Units]?: number;
};

export class IDV extends WeightedNumber {

  bushels: number;
  chaldrons: number;
  gallons: number;
  pecks: number;
  pints: number;
  quarts: number;

  units = UNITS;

  weights: Readonly<Weights> = {
    bushels: 36,
    gallons: 2,
    pecks: 4,
    pints: 2,
    quarts: 4
  };

  /** ctor */
  constructor(values: Values | IDV) {
    super();
    this.initialize(values);
  }

}
