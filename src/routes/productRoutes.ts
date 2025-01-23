import express, { Router } from 'express';
import { createProduct } from '../controllers/productController';
const router= express.Router()

router.post('/product',createProduct)

export default router