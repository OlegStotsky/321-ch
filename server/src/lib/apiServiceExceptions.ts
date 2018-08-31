export class BoardNotFoundError extends Error {
  constructor(errorMessage: string) {
    super(errorMessage);
  }
}

export class ThreadNotFoundError extends Error {
  constructor(errorMessage: string) {
    super(errorMessage);
  }
}
