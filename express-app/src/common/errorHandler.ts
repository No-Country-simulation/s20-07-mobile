import { NextFunction, Request, Response } from 'express';

export interface CustomError extends Error {
  isCustom?: boolean;
  statusCode?: number;
}

// Middleware de manejo de errores
const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction, // Obligatorio incluso si no se usa
) => {
  if (err.isCustom) {
    return res.status(err.statusCode || 500).json({
      status: false,
      message: err.message,
    });
  }

  console.error(`[ERROR-HANDLER]: ${err.message}`);

  return res.status(500).json({
    status: false,
    message: 'Error interno del servidor',
  });
};

export default errorHandler;
