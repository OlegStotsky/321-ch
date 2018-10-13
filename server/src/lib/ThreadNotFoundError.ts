export default class ThreadNotFoundError extends Error {
  constructor(public message: string) {
    super(message);
  }
}
