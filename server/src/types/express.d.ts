declare global {
  namespace Express {
    interface Request {
      userId?: string; // use `number` if your IDs are numeric
    }
  }
}

export {};