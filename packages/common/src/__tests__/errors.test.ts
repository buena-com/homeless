import { NotFoundError, NotImplementedError } from '../errors';

describe('NotImplementedError',  () => {
  it('should contain the stack trace in the message', () => {

    const randomFunctionName = () => new NotImplementedError();

    const error = randomFunctionName();

    expect(error.message).toContain('randomFunctionName');
  });
});

describe('NotFoundError', () => {

  describe('isNotFound(error)', () => {

    it('should match on instance',  () => {
      const notFoundError = new NotFoundError('test');
      expect(NotFoundError.isNotFound(notFoundError)).toBeTruthy();
    });

    it('should match on message',  () => {
      const notFoundError = new NotFoundError('test');
      const other = new Error(`Error Occurred: ${notFoundError.message}`);

      expect(NotFoundError.isNotFound(other)).toBeTruthy();
    });

  });

});
