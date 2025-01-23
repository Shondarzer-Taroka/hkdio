import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';

const app=express()
app.use(express.json())
app.use(cors())
connectDB()


export default app
