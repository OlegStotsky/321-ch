export class AppError extends Error {
  constructor(public description: string, public isOperational: boolean) {
    super(description);
  }
}
