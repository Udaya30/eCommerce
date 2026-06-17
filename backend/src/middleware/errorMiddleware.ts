import { Request, Response, NextFunction } from 'express';

export interface ErrorResponse {
  status: number;
  message: string;
  error?: any;
}

export const errorMiddleware = (err: ErrorResponse, req: Request, res: Response, next: NextFunction): void => {
  const status = err.status || 500;
  const message = err.message || 'Internal server error';

  console.error(`Error: ${message}`, err);

  res.status(status).json({
    status,
    message,
    error: process.env.NODE_ENV === 'development' ? err.error : {},
  });
};
