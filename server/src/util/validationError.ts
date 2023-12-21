export class ValidationError {
  constructor(readonly name: string, readonly message: string) {}

  static isInstance(err: unknown): err is ValidationError {
    if (err === undefined) return false;
    if (typeof err !== "object") return false;
    if (err === null) return false;
    return err instanceof ValidationError;
  }
}
