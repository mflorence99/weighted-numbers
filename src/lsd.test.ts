import { LSD } from './lsd';

describe('LSD construction', () => {
  const lsd = new LSD({ pounds: 25, shillings: 42, pence: 99 });

  test('LSD is formatted as readble English text', () => {
    expect(lsd.format()).toEqual('£27 10s 3d');
  });

});
