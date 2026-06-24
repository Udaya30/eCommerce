// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// import User from '../models/User';

// interface JwtPayload {
//   userId: string;
// }

// export interface AuthRequest extends Request {
//   userId?: string;
//   user?: any;
// }

// const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
//   try {
//     const token = (req as any).cookies?.token || req.headers.authorization?.split(' ')[1];
//     if (!token) {
//       res.status(401).json({ error: 'No token provided' });
//       return;
//     }

//     const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
//     if (!payload?.userId) {
//       res.status(401).json({ error: 'Invalid token' });
//       return;
//     }

//     const user = await User.findById(payload.userId);
//     if (!user) {
//       res.status(401).json({ error: 'User not found' });
//       return;
//     }

//     req.userId = payload.userId;
//     req.user = user;
//     next();
//   } catch (error) {
//     res.status(401).json({ error: 'Unauthorized' });
//   }
// };
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

export interface AuthRequest extends Request {
  user?: any;
}

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as any;

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err: any) {
    console.error("JWT verify failed:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};