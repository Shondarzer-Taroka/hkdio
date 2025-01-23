import express, { Router } from 'express';
import { createProduct, getProduct, getProductWithPagination, getTotalPricesByDate, updateProduct } from '../controllers/productController';
const router= express.Router()

router
.get('/product',getProduct)
.get('/productPagination',getProductWithPagination)
.get('/getTotalPricesByDate',getTotalPricesByDate)
.post('/product',createProduct)
.put('/product/update/:id',updateProduct)

export default router