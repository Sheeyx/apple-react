import { ProductStatus, ProductCollection, ProductSize } from "../enums/products.enum";

export interface Product {
    _id: string;
    productStatus: ProductStatus;
    productStorage: String;
    productCollection: ProductCollection;
    productName: string;
    productPrice: number;
    productLeftCount: number;
    productSize: ProductSize;
    productVolume: number; 
    productDesc?: string;
    productImages: string[];
    productViews: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface ProductInquire {
    order: string;
    page: number;
    limit: number;
    productCollection?: ProductCollection;
    search?: string; 
}