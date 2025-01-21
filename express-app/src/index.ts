import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

import router from './routes/index';
import errorHandler, { CustomError } from './common/errorHandler';

// Variables
const PORT = 3000;
const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api', router);

// Middleware de manejo de errores
app.use(
  errorHandler as (err: CustomError, req: Request, res: Response, next: NextFunction) => void,
);

// Inicialización del servidor
app.listen(PORT, () => {
  console.clear();
  console.log(`Server live on: http://localhost:${PORT}`);
});
