import { LSD } from './lsd';

describe('LSD construction', () => {
  const lsd = new LSD({ pounds: 25.25, shillings: 42.5, pence: 99 });

  test('Units are pence ...', () => {
    expect(lsd.units).toContain('pence');
    expect(lsd.units).toContain('shillings');
    expect(lsd.units).toContain('pounds');
  });

  test('Weights are pence: ...', () => {
    expect(lsd.weights.pence).toEqual(12);
    expect(lsd.weights.shillings).toEqual(20);
  });

  test('Values have been normalized', () => {
    expect(lsd.pence).toEqual(9);
    expect(lsd.shillings).toEqual(15);
    expect(lsd.pounds).toEqual(27);
  });

  test('LSD is formatted as readable English text', () => {
    expect(lsd.format()).toEqual('£27 15s 9d');
  });

});

describe('Zero LSD', () => {
  const lsd = new LSD({ shillings: 1, pence: -12 });

  test('Values have been normalized', () => {
    expect(lsd.pence).toEqual(0);
    expect(lsd.shillings).toEqual(0);
    expect(lsd.pounds).toEqual(0);
  });

  test('LSD is formatted as readable English text', () => {
    expect(lsd.format()).toEqual('£0');
  });

});

describe('Negative LSD', () => {
  const lsd = new LSD({ pounds: -10, shillings: -1, pence: -14 });

  test('Values have been normalized', () => {
    expect(lsd.pence).toEqual(-2);
    expect(lsd.shillings).toEqual(-2);
    expect(lsd.pounds).toEqual(-10);
  });

  test('LSD is formatted as readable English text', () => {
    expect(lsd.format()).toEqual('(£10 2s 2d)');
  });

});

describe('Retail LSD format', () => {
  const lsd1 = new LSD({ shillings: 32, pence: 6 });
  const lsd2 = new LSD({ shillings: 15, pence: 0 });

  test('Retail LSD with pence is formatted as readable English text', () => {
    expect(lsd1.format()).toEqual('32/6');
  });

  test('Retail LSD w/o pence is formatted as readable English text', () => {
    expect(lsd2.format()).toEqual('15/-');
  });

});
