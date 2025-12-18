import express from 'express';
import type {Express, Request, Response} from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js'

// Load environment variables from .env file
dotenv.config();

const app: Express = express();

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

// Middleware
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/user', userRoutes)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
