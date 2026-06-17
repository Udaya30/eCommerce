import { Request, Response, NextFunction } from 'express';

export interface AuthRequest extends Request {
  userId?: string;
  token?: string;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ error: 'No token provided' });
      return;
    }
    // TODO: Implement JWT verification logic
    req.userId = 'user_id_from_token';
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};
