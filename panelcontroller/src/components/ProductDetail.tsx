import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/productService';

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
}

const ProductDetail: React.FC = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const data = await getProductById(Number(id));
            setProduct(data || null);
        };
        fetchProduct();
    }, [id]);

    if (!product) return <div>Loading...</div>;

    return (
        <div>
            <h1>Product Details</h1>
            <p>Name: {product.name}</p>
            <p>Price: ${product.price}</p>
            <p>Description: {product.description}</p>
        </div>
    );
};

export default ProductDetail;
