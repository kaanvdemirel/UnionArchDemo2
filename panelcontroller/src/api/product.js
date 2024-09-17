const apiUrl = 'https://localhost:44382/api/products';

export const fetchProducts = async () => {
    const response = await fetch(`${apiUrl}/getAll`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export const addProduct = async (product) => {
    const response = await fetch(`${apiUrl}/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export const updateProduct = async (product) => {
    const response = await fetch(`${apiUrl}/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export const deleteProduct = async (id) => {
    const response = await fetch(`${apiUrl}/delete/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};
