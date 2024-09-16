import { Product } from '../models/Product';

const API_URL = 'https://localhost:44382/api/products'; // G�ncellenmi� API URL'si

export const getProducts = async (): Promise<Product[]> => {
    const response = await fetch(`${API_URL}/getAll`);
    const data = await response.json();
    return data as Product[];
};

export const getProductById = async (id: number): Promise<Product | undefined> => {
    const response = await fetch(`${API_URL}/${id}`);
    if (response.ok) {
        const data = await response.json();
        return data as Product;
    }
    return undefined;
};

// G�ncellenmi� updateProduct i�levi
export const updateProduct = async (id: number, product: Product): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    });

    if (!response.ok) {
        throw new Error('Failed to update product');
    }
};

// G�ncellenmi� addProduct i�levi
export const addProduct = async (product: Product): Promise<void> => {
    const response = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    });

    if (!response.ok) {
        throw new Error('Failed to add product');
    }
};
