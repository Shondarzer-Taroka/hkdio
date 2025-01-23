import {Request,Response} from 'express';
import Product from '../models/Product';

export const createProduct=async (req:Request,res:Response) => {
    try {
    const product=new Product(req.body)
    const savedProduct=await product.save()

    console.log(product);
    res.status(201).json(savedProduct)
    
    } catch (error) {
        res.status(500).json({message:'Failed to saved',error})
    }
}