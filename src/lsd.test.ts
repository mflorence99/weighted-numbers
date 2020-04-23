import { LSD } from './lsd';

describe('LSD construction', () => {
  const lsd = new LSD({ pounds: 25.25, shillings: 42.5, pence: 99 });

  test('LSD is formatted as readable English text', () => {
    expect(lsd.format()).toEqual('£27 15s 9d');
  });

});
