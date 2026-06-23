"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLocation = exports.getUser = exports.verifyToken = exports.logout = exports.login = exports.register = void 0;
const register = async (req, res) => {
    try {
        // TODO: Implement user registration logic
        res.status(201).json({ message: 'User registered' });
    }
    catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        // TODO: Implement user login logic
        res.json({ message: 'User logged in', token: 'jwt_token' });
    }
    catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
};
exports.login = login;
const logout = async (req, res) => {
    try {
        // TODO: Implement user logout logic
        res.json({ message: 'User logged out' });
    }
    catch (error) {
        res.status(500).json({ error: 'Logout failed' });
    }
};
exports.logout = logout;
const verifyToken = async (req, res) => {
    try {
        // TODO: Implement token verification logic
        res.json({ message: 'Token verified' });
    }
    catch (error) {
        res.status(500).json({ error: 'Token verification failed' });
    }
};
exports.verifyToken = verifyToken;
const getUser = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        res.json({ user: { id: user._id, name: user.name, email: user.email, location: user.location } });
    }
    catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({ message: 'Failed to fetch user' });
    }
};
exports.getUser = getUser;
const updateLocation = async (req, res) => {
    try {
        const { location } = req.body;
        if (!location) {
            res.status(400).json({ message: 'Location is required' });
            return;
        }
        const user = req.user;
        if (!user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        user.location = location;
        await user.save();
        res.json({ message: 'Location updated successfully', user: { id: user._id, email: user.email, location: user.location } });
    }
    catch (error) {
        console.error('Update location error:', error);
        res.status(500).json({ message: 'Failed to update location' });
    }
};
exports.updateLocation = updateLocation;
