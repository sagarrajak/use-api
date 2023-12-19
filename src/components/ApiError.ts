export class ApiError extends Error {
    public error: any
    constructor(message: string, err: any) {
      super(message)
      this.name = 'ApiError'
      this.error = err
    }
  }