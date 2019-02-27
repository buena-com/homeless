import { promisify } from '../promisify';

describe('promisify', () => {

  it('should propagate an error', async () => {
    try {
      await promisify<string>((callback) => {
        callback(Error('Failed'));
      });

      fail('should have thrown an error');
    } catch (e) {
      expect(e).toEqual(Error('Failed'));
    }
  });

  it('should propagate a value', async () => {
    const result = await promisify<string>((callback) => {
      callback(null, 'Value');
    });

    expect(result).toEqual('Value');
  });

});



