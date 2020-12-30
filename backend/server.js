import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Initialize dotenv
dotenv.config();

// Connection to DB
connectDB();

const app = express();

// Run morgan logger in dev Mode
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Parser
app.use(express.json());

// API running
app.get('/', (req, res) => {
  res.send('API is running');
});

// Route mounts
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

// Paypal config
app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

// make uploads folder static
const __dirname = path.resolve(); //__dirname is not available in ES6 modules so we use this
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// ***************Middleware
// Deal with 404
app.use(notFound);

// Custom error handler
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
