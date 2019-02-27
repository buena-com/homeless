export type Callback<T> = (err?: Error | null, value?: T) => void;

/**
 * Wraps a callback and returns a promise using generics to ensure the return type.
 *
 *  E.g: promisify((callback) => functionWithCallback({input}, callback);
 *
 * @param fun
 */
export const promisify = <T>(fun: (callback: Callback<T>) => void): Promise<T> => {
  return new Promise((resolve, reject) => {
    fun((err, value) => {
      if (err) {
        reject(err);
      } else {
        resolve(value);
      }
    });
  });
};
