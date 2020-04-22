import { IDV } from './idv';

describe('dummy test', () => {
  const idv = new IDV();
  test('this is always true', () => {
    expect(idv).toBeTruthy();
  });
  test('this is always false', () => {
    expect(null).toBeFalsy();
  });
});
