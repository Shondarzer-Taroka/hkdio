import { Request, Response } from 'express';
import Product from '../models/Product';
import { ObjectId } from 'bson';

export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = new Product(req.body)
        const savedProduct = await product.save()

        console.log(product);
        res.status(201).json(savedProduct)

    } catch (error) {
        res.status(500).json({ message: 'Failed to saved', error })
    }
}

export const getProduct = async (req: Request, res: Response) => {
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: 'something faces error', error })
    }
}


export const getProductWithPagination =async (req: Request, res: Response) => {
    try {
        // Parse page and limit from query parameters, with defaults
        const page = parseInt(req.query.page as string) || 1; // Default to page 1
        const limit = parseInt(req.query.limit as string) || 6; // Default to 6 items per page

        // Calculate the skip value
        const skip = (page - 1) * limit;

        // Fetch paginated products
        const products = await Product.find().skip(skip).limit(limit);

        // Count the total number of documents for pagination metadata
        const total = await Product.countDocuments();

        // Return paginated data and metadata
        res.status(200).json({
            products,
            total,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
        });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error });
    }
};



export const getTotalPricesByDate = async (req: Request, res: Response) => {
    try {
        // Get the current date
        const now = new Date();

        // Define date ranges for today, month, and year
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const startOfTomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const startOfYear = new Date(now.getFullYear(), 0, 1);

        // Run aggregation for all filters
        const result = await Product.aggregate([
            {
                $facet: {
                    today: [
                        {
                            $match: {
                                createdAt: {
                                    $gte: startOfToday,
                                    $lt: startOfTomorrow,
                                },
                            },
                        },
                        {
                            $group: {
                                _id: null,
                                totalPrice: { $sum: '$price' },
                            },
                        },
                    ],
                    month: [
                        {
                            $match: {
                                createdAt: {
                                    $gte: startOfMonth,
                                    $lt: startOfTomorrow,
                                },
                            },
                        },
                        {
                            $group: {
                                _id: null,
                                totalPrice: { $sum: '$price' },
                            },
                        },
                    ],
                    year: [
                        {
                            $match: {
                                createdAt: {
                                    $gte: startOfYear,
                                    $lt: startOfTomorrow,
                                },
                            },
                        },
                        {
                            $group: {
                                _id: null,
                                totalPrice: { $sum: '$price' },
                            },
                        },
                    ],
                },
            },
        ]);

        // Extract the results and handle cases where no data exists
        console.log(result);
        
        const totalPrices = {
            today: result[0].today[0]?.totalPrice || 0,
            month: result[0].month[0]?.totalPrice || 0,
            year: result[0].year[0]?.totalPrice || 0,
        };

        // Send the response
        res.status(200).json(totalPrices);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error });
    }
};


export const updateProduct = async (req: Request, res: Response) => {
    try {
        console.log(req.body)
        const productUpdate = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        // console.log(productUpdate);
        if (!productUpdate) {
            res.status(404).json({ message: 'Not found Product' })
        }
        res.status(200).json(productUpdate)

    } catch (error) {
        res.status(500).json({ message: 'Failed to update product', error });
    }
}