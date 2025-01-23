import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import router from './routes/productRoutes';
import errorHandler from './middlewares/errorHandler';

const app = express()
app.use(express.json())
app.use(cors())
connectDB()

// //  routes
app.use('/api', router)

// // Error Handling Middleware
app.use(errorHandler);


export default app
