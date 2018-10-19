
// Throw this if data is missing or not found.
export class ForbiddenAccessError extends Error {
  static Code = 403;

  static isForbidden(error: Error): boolean {
    return error instanceof ForbiddenAccessError ||
      new RegExp(`${ForbiddenAccessError.Code}: `)
        .test(error.message);
  }

  constructor(message: string) {
    super(`${ForbiddenAccessError.Code}: ${message}`);
  }

}

export class NotImplementedError extends Error {

  constructor() {
    super('not implemented');
    this.message = `${this.stack || this.message}`;
  }
}

// Throw this if data is missing or not found.
export class NotFoundError extends Error {
  static Code = 404;

  static isNotFound(error: Error): boolean {
    return error instanceof NotFoundError ||
      new RegExp(`${NotFoundError.Code}: `)
        .test(error.message);
  }

  constructor(message: string) {
    super(`${NotFoundError.Code}: ${message}`);
  }
}

// Resolver for obtaining the error code.
export function errorCode(error: Error): number | undefined {
  if (NotFoundError.isNotFound(error)) {
    return NotFoundError.Code;
  } else if (ForbiddenAccessError.isForbidden(error)) {
    return ForbiddenAccessError.Code;
  }
}
