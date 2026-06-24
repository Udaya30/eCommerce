import { Response } from 'express';
import User from '../models/User';
import { AuthRequest } from '../middleware/authMiddleware';

export const register = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // TODO: Implement user registration logic
    res.status(201).json({ message: 'User registered' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

export const login = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // TODO: Implement user login logic
    res.json({ message: 'User logged in', token: 'jwt_token' });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};

export const logout = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // TODO: Implement user logout logic
    res.json({ message: 'User logged out' });
  } catch (error) {
    res.status(500).json({ error: 'Logout failed' });
  }
};

export const verifyToken = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // TODO: Implement token verification logic
    res.json({ message: 'Token verified' });
  } catch (error) {
    res.status(500).json({ error: 'Token verification failed' });
  }
};

export const getUser = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = req.user;
    if (!user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    res.json({ user: { id: user._id, name: user.name, email: user.email, location: user.location } });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Failed to fetch user' });
  }
};

export const updateLocation = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { location } = req.body;
    if (!location) {
      res.status(400).json({ message: "Location is required" });
      return;
    }

    const user = req.user;
    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    user.location = location;
    await user.save();

    res.json({
      message: "Location updated successfully",
      user: { id: user._id, email: user.email, location: user.location },
    });
  } catch (error) {
    console.error("Update location error:", error);
    res.status(500).json({ message: "Failed to update location" });
  }
};
