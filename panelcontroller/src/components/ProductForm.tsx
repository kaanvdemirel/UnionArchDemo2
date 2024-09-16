import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, addProduct, updateProduct } from '../services/productService';
import { Product } from '../models/Product';

interface ProductFormProps {
    onSave?: () => void; // onSave prop'unu burada tanýmlýyoruz
}

const ProductForm: React.FC<ProductFormProps> = ({ onSave }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product>({
        id: 0,
        name: '',
        price: 0,
        description: '',
        category: '' // category alanýný buraya da ekliyoruz
    });

    useEffect(() => {
        if (id) {
            const fetchProduct = async () => {
                const data = await getProductById(Number(id));
                if (data) setProduct(data);
            };
            fetchProduct();
        }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (id) {
                await updateProduct(Number(id), product); // updateProduct için iki argüman geçiyoruz
            } else {
                await addProduct(product); // addProduct için bir argüman geçiyoruz
            }
            if (onSave) onSave(); // onSave iþlevini çaðýrýyoruz
            navigate('/');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                placeholder="Product Name"
            />
            <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                placeholder="Product Price"
            />
            <input
                type="text"
                name="description"
                value={product.description}
                onChange={handleChange}
                placeholder="Product Description"
            />
            <input
                type="text"
                name="category"
                value={product.category}
                onChange={handleChange}
                placeholder="Product Category"
            />
            <button type="submit">{id ? 'Update Product' : 'Add Product'}</button>
        </form>
    );
};

export default ProductForm;
