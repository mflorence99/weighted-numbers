import { IDV } from './idv';

describe('IDV construction', () => {
  const idv = new IDV({ pints: 100 });

  test('Units are pints ...', () => {
    expect(idv.units).toContain('pints');
    expect(idv.units).toContain('quarts');
    expect(idv.units).toContain('gallons');
    expect(idv.units).toContain('pecks');
    expect(idv.units).toContain('bushels');
    expect(idv.units).toContain('chaldrons');
  });

  test('Weights are pints: ...', () => {
    expect(idv.weights.pints).toEqual(2);
    expect(idv.weights.quarts).toEqual(4);
    expect(idv.weights.gallons).toEqual(2);
    expect(idv.weights.pecks).toEqual(4);
    expect(idv.weights.bushels).toEqual(36);
    expect(idv.weights.chaldrons).toBeUndefined();
  });

  test('Values have been normalized', () => {
    expect(idv.pints).toEqual(0);
    expect(idv.quarts).toEqual(2);
    expect(idv.gallons).toEqual(0);
    expect(idv.pecks).toEqual(2);
    expect(idv.bushels).toEqual(1);
    expect(idv.chaldrons).toEqual(0);
  });

  test('IDV is formatted as readable English text', () => {
    expect(idv.format()).toEqual('1 bushels, 2 pecks, 2 quarts');
  });

});

describe('IDV equality', () => {
  const idv = new IDV({ pints: 100 });

  test('IDV is equal to another', () => {
    expect(idv.isEqual({ pints: 100 })).toBeTruthy();
    expect(idv.isEqual({ quarts: 50 })).toBeTruthy();
  });

});

describe('Zero IDV', () => {
  const idv = new IDV({ });

  test('Values have been normalized', () => {
    expect(idv.pints).toEqual(0);
    expect(idv.quarts).toEqual(0);
    expect(idv.gallons).toEqual(0);
    expect(idv.pecks).toEqual(0);
    expect(idv.bushels).toEqual(0);
    expect(idv.chaldrons).toEqual(0);
  });

  test('IDV is formatted as readable English text', () => {
    expect(idv.format()).toEqual('0 pints');
  });

});

describe('Negative IDV', () => {
  const idv = new IDV({ gallons: -2, quarts: -3, pints: 1 });

  test('Values have been normalized', () => {
    expect(idv.pints).toEqual(-1);
    expect(idv.quarts).toEqual(-2);
    expect(idv.gallons).toEqual(-0);
    expect(idv.pecks).toEqual(-1);
    expect(idv.bushels).toEqual(0);
    expect(idv.chaldrons).toEqual(0);
  });

  test('IDV is formatted as readable English text', () => {
    expect(idv.format()).toEqual('(1 pecks, 2 quarts, 1 pints)');
  });

});

describe('Decimal IDV', () => {
  const idv = new IDV({ gallons: 2.333, quarts: 5.6, pints: 1.2 });

  test('Values have been normalized', () => {
    expect(idv.pints).toEqual(1.064);
    expect(idv.quarts).toEqual(3);
    expect(idv.gallons).toEqual(1);
    expect(idv.pecks).toEqual(1);
    expect(idv.bushels).toEqual(0);
    expect(idv.chaldrons).toEqual(0);
  });

  test('IDV is formatted as readable English text', () => {
    expect(idv.format()).toEqual('1 pecks, 1 gallons, 3 quarts, 1.064 pints');
  });

});

describe('IDV addition', () => {
  const idv = new IDV({ pints: 100 })
    .add({ quarts: 5, pecks: 18 });

  test('Values have been normalized', () => {
    expect(idv.pints).toEqual(0);
    expect(idv.quarts).toEqual(3);
    expect(idv.gallons).toEqual(1);
    expect(idv.pecks).toEqual(0);
    expect(idv.bushels).toEqual(6);
    expect(idv.chaldrons).toEqual(0);
  });

  test('IDV is formatted as readable English text', () => {
    expect(idv.format()).toEqual('6 bushels, 1 gallons, 3 quarts');
  });

});
