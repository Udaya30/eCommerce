"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal server error';
    console.error(`Error: ${message}`, err);
    res.status(status).json({
        status,
        message,
        error: process.env.NODE_ENV === 'development' ? err.error : {},
    });
};
exports.errorMiddleware = errorMiddleware;
