

export interface IOrder {
    user: any;
    orderItems: Array<{
        name: string;
        qty: number;
        price: number;
        product: string;
    }>;
    shippingAddress: string;
    paymentMethod: string;
    totalPrice: number;
    isPaid: boolean;
    paidAt?: Date;
    isDelivered: boolean;
    deliveredAt?: Date;
}