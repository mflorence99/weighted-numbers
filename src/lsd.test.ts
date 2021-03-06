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

describe('LSD farthings', () => {
  const lsd1 = new LSD({ pence: 15.2 });
  const lsd2 = new LSD({ pence: 15.6 });
  const lsd3 = new LSD({ pounds: 10, pence: 15.8 });

  test('LSD is formatted with 1 farthing', () => {
    expect(lsd1.format()).toEqual('1/3¼');
  });

  test('LSD is formatted with 1 halfpenny', () => {
    expect(lsd2.format()).toEqual('1/3½');
  });

  test('LSD is formatted with 3 farthings', () => {
    expect(lsd3.format()).toEqual('£10 1s 3¾d');
  });

});

describe('LSD comparisons', () => {
  const lsd = new LSD({ pounds: 25.25, shillings: 42.5, pence: 99 });

  test('LSD is equal to another', () => {
    expect(lsd.isEqual({ pounds: 27, shillings: 15, pence: 9 })).toBeTruthy();
  });

  test('LSD is less than another', () => {
    expect(lsd.isLess({ pounds: 27, shillings: 15, pence: 10 })).toBeTruthy();
  });

  test('LSD is greater than another', () => {
    expect(lsd.isGreater({ pounds: 27, shillings: 15, pence: 8 })).toBeTruthy();
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

describe('LSD addition', () => {
  const lsd = new LSD({ pounds: -10, shillings: -1, pence: -14 })
    .add({ pounds: 10 });

  test('Values have been normalized', () => {
    expect(lsd.pence).toEqual(-2);
    expect(lsd.shillings).toEqual(-2);
    expect(lsd.pounds).toEqual(0);
  });

});

describe('LSD division', () => {
  const lsd = new LSD({ pounds: 9 }).divide(2);

  test('Values have been normalized', () => {
    expect(lsd.pence).toEqual(0);
    expect(lsd.shillings).toEqual(10);
    expect(lsd.pounds).toEqual(4);
  });

});

describe('LSD multiplication', () => {
  const lsd = new LSD({ pounds: 4, shillings: 10 }).multiply(2);

  test('Values have been normalized', () => {
    expect(lsd.pence).toEqual(0);
    expect(lsd.shillings).toEqual(0);
    expect(lsd.pounds).toEqual(9);
  });

});

describe('LSD subtraction', () => {
  const lsd = new LSD({ pounds: -10, shillings: -1, pence: -14 })
    .subtract({ pounds: -10 });

  test('Values have been normalized', () => {
    expect(lsd.pence).toEqual(-2);
    expect(lsd.shillings).toEqual(-2);
    expect(lsd.pounds).toEqual(0);
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
