import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import ProductDetail from './components/ProductDetail';

const App: React.FC = () => {
    const handleSave = () => {
        console.log('Product saved');
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/edit/:id" element={<ProductForm onSave={handleSave} />} />
                <Route path="/add" element={<ProductForm onSave={handleSave} />} />
                <Route path="/product/:id" element={<ProductDetail />} />
            </Routes>
        </Router>
    );
};

export default App;
