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

    readonly bushels: number;
    readonly chaldrons: number;
    readonly gallons: number;
    readonly pecks: number;
    readonly pints: number;
    readonly quarts: number;

    readonly units = UNITS;

    readonly weights: Readonly<Weights> = {
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
