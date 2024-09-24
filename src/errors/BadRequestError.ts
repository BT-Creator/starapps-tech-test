export class BadRequestError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'BadRequestError';
      Error.captureStackTrace(this, this.constructor);
    }
  }