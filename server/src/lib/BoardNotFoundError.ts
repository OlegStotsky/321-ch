export default class BoardNotFoundError extends Error {
  constructor(public message: string) {
    super(message);
  }
}
