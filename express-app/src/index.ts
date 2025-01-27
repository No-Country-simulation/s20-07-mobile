import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import router from './routes/index';
import errorHandler, { CustomError } from './common/errorHandler';

// Variables
const PORT = 3000;
const app = express();

// Middlewares globales
app.use(
  cors({
    origin: '*', // Permitir todos los orígenes
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'], // Permitir todos los métodos
  }),
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
