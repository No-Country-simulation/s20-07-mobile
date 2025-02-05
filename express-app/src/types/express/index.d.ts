export interface User {
  id: number;
  email: string;
  password?: string;
}

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}
