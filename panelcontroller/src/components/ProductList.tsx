import React from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/productService';

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
}

const ProductList: React.FC = () => {
    const [products, setProducts] = React.useState<Product[]>([]);

    React.useEffect(() => {
        const fetchProducts = async () => {
            const data = await getProducts();
            setProducts(data);
        };
        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Product List</h1>
            <Link to="/add">Add Product</Link>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        {product.name} - ${product.price}
                        <Link to={`/edit/${product.id}`}>Edit</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
