import { Handler } from 'aws-lambda';
import RavenLambdaWrapper from 'serverless-sentry-lib';

/* tslint:disable-next-line:no-var-requires*/
const Raven = require('raven');

function isPromise<T>(value: void | PromiseLike<T>): value is Promise<T> {
  return !!(value && (value instanceof Promise || typeof value.then === 'function'));
}

const wrapSentryHandler = <TEvent, TResult>(handler: Handler<TEvent, TResult>): Handler<TEvent, TResult> => {
  // sentry expects the old callbacks to be functions, so we mock them;
  // https://github.com/arabold/serverless-sentry-lib/issues/15
  const bindMock = { bind: ()  => undefined };

  // We have to propagate promises via callback, as sentry doesn't seem to be able to handle promises.
  return async (event, context, callback) => {
    try {
      const resultPromise = handler(event, {
        done: bindMock,
        succeed: bindMock,
        fail: bindMock,
        ...context,
      }, callback);

      if (isPromise(resultPromise)) {
        const result = await resultPromise;
        callback(null, result);
        return result as any;
      }

      callback(null, resultPromise as any);
      return resultPromise;

    } catch (error) {
      callback(error);
      throw error;
    }
  };
};

// Wrapper that provides error logging via sentry
export const lambdaLogger = <E, R>(handler: Handler<E, R>): Handler<E, R> => {
  try {
    const sentryWrapper = RavenLambdaWrapper.handler(Raven as any, handler);

    return wrapSentryHandler(sentryWrapper);
  } catch (error) {
    console.error(`Failed: ${error}`, error);
    throw error;
  }
};
